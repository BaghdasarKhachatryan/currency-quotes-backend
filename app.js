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
    const rates = [
      {
        time: new Date(),
        symbol: "EURUSD",
        bid: Math.random() * (1.1236 - 1.123) + 1.123,
        ask: Math.random() * (1.124 - 1.1237) + 1.1237,
      },
      {
        time: new Date(),
        symbol: "GBPUSD",
        bid: Math.random() * (1.2536 - 1.253) + 1.253,
        ask: Math.random() * (1.254 - 1.2537) + 1.2537,
      },
      {
        time: new Date(),
        symbol: "USDJPY",
        bid: Math.random() * (110.256 - 110.234) + 110.234,
        ask: Math.random() * (110.26 - 110.256) + 110.256,
      },
      {
        time: new Date(),
        symbol: "AUDUSD",
        bid: Math.random() * (0.7236 - 0.723) + 0.723,
        ask: Math.random() * (0.724 - 0.7237) + 0.7237,
      },
      {
        time: new Date(),
        symbol: "USDCAD",
        bid: Math.random() * (1.2648 - 1.264) + 1.264,
        ask: Math.random() * (1.265 - 1.2647) + 1.2647,
      },
      {
        time: new Date(),
        symbol: "NZDUSD",
        bid: Math.random() * (0.6536 - 0.653) + 0.653,
        ask: Math.random() * (0.654 - 0.6537) + 0.6537,
      },
    ];
    socket.emit("currencyRates", rates);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
