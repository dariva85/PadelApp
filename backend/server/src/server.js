const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const db = require("./db");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ ok: true });
});

const start = async () => {
  await db.connect();
  app.listen(config.SERVER_PORT, () => {
    console.log(`Padel App Server listening on port: ${config.SERVER_PORT}`);
  });
};

start();
