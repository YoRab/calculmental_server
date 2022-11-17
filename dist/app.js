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
        if (!!game) {
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
        console.log(game);
        console.log(code);
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
const launchGame = (game) => {
    game.state = 'running';
    for (const player of game.players) {
        const playerSocketId = player.id;
        const playerSocket = sockets.get(playerSocketId);
        playerSocket === null || playerSocket === void 0 ? void 0 : playerSocket.emit("gameStatusUpdated", game.state);
    }
    const teacherSocket = sockets.get(game.teacher.id);
    teacherSocket === null || teacherSocket === void 0 ? void 0 : teacherSocket.emit("gameStatusUpdated", game.state);
};
httpServer.listen(port, () => console.log(`Listening on port ${port}`));
