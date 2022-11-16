import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 4001;

const app = express();

const httpServer = createServer(app);


interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const io = new Server<
ClientToServerEvents,
ServerToClientEvents,
InterServerEvents,
SocketData
>(httpServer, { 
  cors: {
  origin: "*"
}})

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));