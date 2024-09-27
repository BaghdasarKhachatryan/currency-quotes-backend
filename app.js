const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  setInterval(() => {
    const rates = {
      time: new Date(),
      symbol: "EURUSD",
      bid: Math.random() * (1.1236 - 1.123) + 1.123,
      ask: Math.random() * (1.124 - 1.1237) + 1.1237,
    };
    socket.emit("currencyRates", rates);
  }, 1000);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
