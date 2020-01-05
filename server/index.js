const express = require("express");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var cors = require("cors");
var router = express.Router();
const port = 4000;
app.use(express.json());
app.use(cors());
var users = require("./routes/users");
var vacations = require("./routes/vacations");

app.use("/users", users);
app.use("/vacations", vacations);

app.get("/", (req, res) => {
  console.log("Shlomi!");
});

connection = [];

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
http.listen(port, () => console.log(`Server is running on ${port}`));

io.sockets.on("connection", socket => {
  connection.push(socket);
  console.log("Connected %s sockets connected", connection.length);

  socket.on("disconnet", data => {
    connection.splice(connection.indexOf(socket), 1);
    console.log("Disconnected %s sockets connected", connection.length);
  });

  //Send message
  socket.on("send message", data => {
    socket.emit("new Message", { msg: data });
    console.log(data);
  });
});
