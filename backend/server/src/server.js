const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = 8080;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(port, () => {
  console.log(`Padel App Server listening on port: ${port}`);
});
