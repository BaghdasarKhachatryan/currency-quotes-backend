const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { geterateRates } = require("./helper/rate");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

let intervalId;
let intervalTimeout = 500;
let isSendingData = true;

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const sendData = () => {
  const rates = geterateRates();
  io.emit("currencyRates", rates);
};

const startDataInterval = (timeout) => {
  clearInterval(intervalId);
  intervalId = setInterval(sendData, timeout);
};

startDataInterval(intervalTimeout);

app.post("/api/setIntervalTimeout", (req, res) => {
  try {
    const { timeout } = req.body;

    if (timeout && Number.isInteger(timeout)) {
      intervalTimeout = timeout;
      isSendingData = true;
      startDataInterval(intervalTimeout);
      res.status(200).json({
        message: `Интервал обновлен до ${intervalTimeout} миллисекунд`,
      });
    } else {
      res.status(400).json({ message: "Неверный интервал тайм-аута." });
    }
  } catch (error) {
    throw error;
  }
});

app.post("/api/stopStartSendingData", (req, res) => {
  try {
    const { command } = req.body;
    if (command === "start") {
      if (!isSendingData) {
        startDataInterval(intervalTimeout);
        isSendingData = true;
        res.status(200).json({ message: "Начата отправка данных." });
      } else {
        res.status(200).json({ message: "Данные уже отправляются." });
      }
    } else {
      if (isSendingData) {
        clearInterval(intervalId);
        isSendingData = false;
        res.status(200).json({ message: "Остановлена ​​отправка данных" });
      } else {
        res
          .status(200)
          .send({ message: "В настоящее время данные не отправляются." });
      }
    }
  } catch (error) {
    throw error;
  }
});

app.use((err, req, res, next) => {
  console.error("Error message :", err.message);
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    status: statusCode,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 3000;
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
