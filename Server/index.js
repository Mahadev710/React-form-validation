const jsonServer = require("json-server");
const express = require("express");
const path = require("path");

const app = express();

// Create the JSON Server “server” (which is an Express app internally)
const server = jsonServer.create();

// Define the router for your JSON file
const router = jsonServer.router(path.join(__dirname, "db.json"));

// Default middlewares (logger, static, cors, etc.)
const middlewares = jsonServer.defaults();

// Use the middlewares on the json-server “server”
server.use(middlewares);

// (Optional) delay middleware
server.use((req, res, next) => {
  setTimeout(next, 0);
});

// *Here* mount the router (you must use the `router` you defined)
server.use(router);

// Now mount the json-server “server” into your main Express “app”
app.use(server);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
