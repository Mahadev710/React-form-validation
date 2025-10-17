const jsonServer = require("json-server");
const express = require("express");
const path = require("path");

const app = express();

const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  setTimeout(next, 0);
});

server.use(router);

app.use(server);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
