const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Serve the webpage
//if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));

const path = require("path");
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
//}

// Load the data
// (Usually data should be fetched from database)
const calendar = require("./data/calendar.json");
const contacts = require("./data/contacts.json");
const dropbox = require("./data/dropbox.json");
const slack = require("./data/slack.json");
const tweet = require("./data/tweet.json");
const data = { ...calendar, ...contacts, ...dropbox, ...slack, ...tweet };
let calendarId = 787661;

// Filter data by keyword
const filterData = (keyword) => {
  const filteredData = {};
  for (const property in data) {
    // Only keep those with matching_terms that starts with the keyword
    filteredData[property] = data[property].filter((item) =>
      item["matching_terms"].some((str) => str.startsWith(keyword))
    );
  }
  return filteredData;
};

// Websocket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const clients = {}; // Socket id for all connected clients with its current search keywords

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("Search", (keyword) => {
    clients[socket.id] = keyword; // Update the keyword when every receive new query from client
    socket.emit("Search", filterData(keyword));
  });
  socket.on("disconnect", () => {
    delete clients[socket.id]; // Remove the socket id from clients when disconnect.
    console.log(`Client:${socket.id} disconnected`);
  });
});

http.listen(5001, () => {
  console.log("listening on *:5001");
});

// Get endpoint for search. (not used after switching to websocket)
app.get("/api/search", function (req, res) {
  const keyword = req.query.keyword;
  if (keyword === undefined) {
    res.json(data);
  } else {
    res.json(filterData(keyword));
  }
});

// Post endpoint for creating new contact
app.post("/api/contacts", function (req, res) {
  const {
    name = "",
    company = "",
    emails = "",
    phones = "",
    matching_terms = "",
    last_contact = "0000-00-00",
  } = req.body;
  if (name === "" || matching_terms === "") {
    res.status(400).send("Error: Missing fields");
  } else {
    calendarId += 1;
    const newContact = {
      name,
      company,
      emails: emails.split(",").filter((el) => el), // split by ',' and remove empty entries
      phones: phones.split(",").filter((el) => el),
      matching_terms: matching_terms.split(",").filter((el) => el),
      last_contact,
      id: calendarId.toString(),
    };
    data.contacts.push(newContact);
    res.status(201).send("New contact created");
  }
  // After create the new contact, push the new filtered data to each client through websocket
  for (const socketId in clients) {
    io.to(socketId).emit("Search", filterData(clients[socketId]));
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
