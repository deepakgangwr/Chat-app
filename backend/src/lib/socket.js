import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",            // for local development
      "https://connectly12.netlify.app"   // for production
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
});
