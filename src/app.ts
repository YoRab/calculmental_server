import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { TEAMS } from "./constants";
import { ClientToServerEvents, CustomSocket, Game, InterServerEvents, ServerToClientEvents, SocketData, Team } from "./types";
import { createCode } from './utils'
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
    if (!!game) {
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
    console.log(game)
    console.log(code)

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


const launchGame = (game: Game) => {
  game.state = 'running'
  for (const player of game.players) {
    const playerSocketId = player.id
    const playerSocket = sockets.get(playerSocketId)
    playerSocket?.emit("gameStatusUpdated", game.state)
  }
  const teacherSocket = sockets.get(game.teacher.id)
  teacherSocket?.emit("gameStatusUpdated", game.state)
}

httpServer.listen(port, () => console.log(`Listening on port ${port}`));