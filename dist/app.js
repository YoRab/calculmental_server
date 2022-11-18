"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const port = process.env.PORT || 4001;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*"
    }
});
const sockets = new Map();
const games = new Map();
io.on("connection", (socket) => {
    console.log("New client connected");
    sockets.set(socket.id, socket);
    handleStudentEvent(socket);
    handleTeacherEvent(socket);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        sockets.delete(socket.id);
    });
});
const handleStudentEvent = (socket) => {
    socket.on("createPlayer", (code, pseudo) => {
        const game = games.get(code);
        if (!!game && (game.state === "ready" || game.state === "starting")) {
            const players = game.players;
            const existingPlayers = players.find(player => player.id === socket.id);
            const team0Count = game.players.filter(player => player.team.id === 0).length;
            const team1Count = game.players.filter(player => player.team.id === 1).length;
            if (!existingPlayers) {
                const player = {
                    id: socket.id,
                    pseudo: pseudo,
                    team: team0Count > team1Count ? constants_1.TEAMS[1] : constants_1.TEAMS[0],
                    heart: 3,
                    score: 0
                };
                game.players.push(player);
                socket.emit("playerCreated", player);
                const teacherSocket = sockets.get(game.teacher.id);
                teacherSocket === null || teacherSocket === void 0 ? void 0 : teacherSocket.emit("refreshPlayers", game.players);
            }
        }
        else {
            socket.emit("gameNotFound");
        }
    });
    socket.on("updatePlayerStatus", (code, heart, score) => {
        const game = games.get(code);
        if (!!game) {
            const newPlayers = game.players.map(player => {
                if (player.id === socket.id) {
                    return Object.assign(Object.assign({}, player), { heart, score });
                }
                return player;
            });
            const newGame = Object.assign(Object.assign({}, game), { players: newPlayers });
            games.set(code, newGame);
            const teacherSocket = sockets.get(game.teacher.id);
            teacherSocket === null || teacherSocket === void 0 ? void 0 : teacherSocket.emit("refreshPlayers", newGame.players);
            calculateTeamScore(newGame);
        }
    });
    socket.on("askForQcm", (index) => {
        socket.emit("newQcm", (0, utils_1.createQuestionAndAnswers)(index));
    });
};
const handleTeacherEvent = (socket) => {
    socket.on("createGame", () => {
        const existingGames = [...games.keys()];
        const code = (0, utils_1.createCode)(existingGames);
        const newGame = {
            code: code,
            teacher: { id: socket.id },
            players: [],
            state: 'ready'
        };
        games.set(newGame.code, newGame);
        socket.emit("gameCreated", code);
    });
    socket.on("destroyGame", (code) => {
        const game = games.get(code);
        if (!!game) {
            const players = game.players;
            for (const player of players) {
                const playerSocketId = player.id;
                const playerSocket = sockets.get(playerSocketId);
                playerSocket === null || playerSocket === void 0 ? void 0 : playerSocket.emit("gameDestroyed");
            }
            socket.emit("gameDestroyed");
            games.delete(code);
        }
    });
    socket.on("startGame", (code) => {
        const game = games.get(code);
        if ((game === null || game === void 0 ? void 0 : game.state) === 'ready') {
            game.state = 'starting';
            setTimeout(() => {
                launchGame(game);
            }, 10000);
            const players = game.players;
            for (const player of players) {
                const playerSocketId = player.id;
                const playerSocket = sockets.get(playerSocketId);
                playerSocket === null || playerSocket === void 0 ? void 0 : playerSocket.emit("gameStatusUpdated", game.state);
            }
            socket.emit("gameStatusUpdated", game.state);
        }
    });
};
const calculateTeamScore = (game) => {
    let team0Score = 0;
    let team1Score = 0;
    for (const player of game.players) {
        if (player.team.id === 0) {
            team0Score += player.score;
        }
        else if (player.team.id === 1) {
            team1Score += player.score;
        }
    }
    const teacherSocket = sockets.get(game.teacher.id);
    teacherSocket === null || teacherSocket === void 0 ? void 0 : teacherSocket.emit("teamScoreUpdated", team0Score, team1Score);
};
const launchGame = (game) => {
    game.state = 'running';
    for (const player of game.players) {
        const playerSocketId = player.id;
        const playerSocket = sockets.get(playerSocketId);
        playerSocket === null || playerSocket === void 0 ? void 0 : playerSocket.emit("gameStatusUpdated", game.state, constants_1.CHRONO_DURATION);
    }
    const teacherSocket = sockets.get(game.teacher.id);
    teacherSocket === null || teacherSocket === void 0 ? void 0 : teacherSocket.emit("gameStatusUpdated", game.state, constants_1.CHRONO_DURATION);
    setTimeout(() => {
        resultGame(game.code);
    }, constants_1.CHRONO_DURATION);
};
const resultGame = (code) => {
    const game = games.get(code);
    if (!game)
        return;
    game.state = 'results';
    let team0Score = 0;
    let team1Score = 0;
    for (const player of game.players) {
        if (player.team.id === 0) {
            team0Score += player.score;
        }
        else if (player.team.id === 1) {
            team1Score += player.score;
        }
    }
    const sortedPlayers = game.players.sort((a, b) => b.score - a.score);
    for (let i = 0; i < sortedPlayers.length; i++) {
        const player = sortedPlayers[i];
        const playerSocketId = player.id;
        const playerSocket = sockets.get(playerSocketId);
        playerSocket === null || playerSocket === void 0 ? void 0 : playerSocket.emit("resultSent", i + 1, player.score, team0Score, team1Score);
        playerSocket === null || playerSocket === void 0 ? void 0 : playerSocket.emit("gameStatusUpdated", game.state);
    }
    const teacherSocket = sockets.get(game.teacher.id);
    teacherSocket === null || teacherSocket === void 0 ? void 0 : teacherSocket.emit("gameStatusUpdated", game.state);
};
httpServer.listen(port, () => console.log(`Listening on port ${port}`));
