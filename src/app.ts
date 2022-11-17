import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { CHRONO_DURATION, TEAMS } from "./constants";
import { ClientToServerEvents, CustomSocket, Game, InterServerEvents, ServerToClientEvents, SocketData, Team } from "./types";
import { createCode, createQuestionAndAnswers } from './utils'
const port = process.env.PORT || 4001;

const app = express();

const httpServer = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "*"
  }
})

const sockets: Map<string, CustomSocket> = new Map()
const games: Map<string, Game> = new Map()

io.on("connection", (socket) => {
  console.log("New client connected");

  sockets.set(socket.id, socket)

  handleStudentEvent(socket)
  handleTeacherEvent(socket)

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    sockets.delete(socket.id)
  });
});


const handleStudentEvent = (socket: CustomSocket) => {
  socket.on("createPlayer", (code, pseudo) => {
    const game = games.get(code)
    if (!!game && (game.state==="ready" || game.state==="starting")) {
      const players = game.players
      const existingPlayers = players.find(player => player.id === socket.id);
      const team0Count = game.players.filter(player => player.team.id === 0).length
      const team1Count = game.players.filter(player => player.team.id === 1).length
      if (!existingPlayers) {
        const player = {
          id: socket.id,
          pseudo: pseudo,
          team: team0Count > team1Count ? TEAMS[1] : TEAMS[0],
          heart: 3,
          score: 0
        }
        game.players.push(player)
        socket.emit("playerCreated", player)
        const teacherSocket = sockets.get(game.teacher.id)
        teacherSocket?.emit("refreshPlayers", game.players)
      }

    } else {
      socket.emit("gameNotFound")
    }
  })


  socket.on("updatePlayerStatus", (code, heart, score) => {
    const game = games.get(code)
    if (!!game) {
        const newPlayers = game.players.map(player => {
          if(player.id === socket.id) {
            return {...player, heart, score}
          }
          return player
        })
        const newGame =  {...game, players : newPlayers}
        games.set(code,newGame)
        const teacherSocket = sockets.get(game.teacher.id)
        teacherSocket?.emit("refreshPlayers", newGame.players)
        calculateTeamScore(newGame)
      }
  })

  socket.on("askForQcm", (index) => {
    socket.emit("newQcm", createQuestionAndAnswers())
  })
}

const handleTeacherEvent = (socket: CustomSocket) => {
  socket.on("createGame", () => {

    const existingGames = [...games.keys()];
    const code = createCode(existingGames)!
    const newGame: Game = {
      code: code,
      teacher: { id: socket.id },
      players: [],
      state: 'ready'
    }
    games.set(newGame.code, newGame)

    socket.emit("gameCreated", code)
  })


  socket.on("destroyGame", (code) => {
    const game = games.get(code)
    if (!!game) {
      const players = game.players
      for (const player of players) {
        const playerSocketId = player.id
        const playerSocket = sockets.get(playerSocketId)
        playerSocket?.emit("gameDestroyed")
      }
      socket.emit("gameDestroyed")
      games.delete(code)
    }
  })

  socket.on("startGame", (code) => {
    const game = games.get(code)

    if (game?.state === 'ready') {
      game.state = 'starting'
      setTimeout(() => {
        launchGame(game);
      }, 10000)
      const players = game.players
      for (const player of players) {
        const playerSocketId = player.id
        const playerSocket = sockets.get(playerSocketId)
        playerSocket?.emit("gameStatusUpdated", game.state)
      }
      socket.emit("gameStatusUpdated", game.state)
    }
  })

}

const calculateTeamScore = (game: Game) => {
  let team0Score =0
  let team1Score =0
  for (const player of game.players) {
    if(player.team.id===0) {
      team0Score+=player.score
    } else if(player.team.id===1) {
      team1Score+=player.score
    }
  }
  const teacherSocket = sockets.get(game.teacher.id)
  teacherSocket?.emit("teamScoreUpdated", team0Score, team1Score)
}


const launchGame = (game: Game) => {
  game.state = 'running'
  for (const player of game.players) {
    const playerSocketId = player.id
    const playerSocket = sockets.get(playerSocketId)
    playerSocket?.emit("gameStatusUpdated", game.state, CHRONO_DURATION)
  }
  const teacherSocket = sockets.get(game.teacher.id)
  teacherSocket?.emit("gameStatusUpdated", game.state, CHRONO_DURATION)

  setTimeout(() => {
    resultGame(game)
  }, CHRONO_DURATION)
}

const resultGame = (game: Game) => {
  game.state = 'results'
  for (const player of game.players) {
    const playerSocketId = player.id
    const playerSocket = sockets.get(playerSocketId)
    playerSocket?.emit("gameStatusUpdated", game.state)
  }
  const teacherSocket = sockets.get(game.teacher.id)
  teacherSocket?.emit("gameStatusUpdated", game.state)
}

httpServer.listen(port, () => console.log(`Listening on port ${port}`));