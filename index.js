const express = require("express");
const fs = require("fs");
const calendar = require("./data/calendar.json");
const contacts = require("./data/contacts.json");
const dropbox = require("./data/dropbox.json");
const slack = require("./data/slack.json");
const tweet = require("./data/tweet.json");
const data = { ...calendar, ...contacts, ...dropbox, ...slack, ...tweet };

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));

  const path = require("path");
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}

app.get("/api", function (req, res) {
  const keyword = req.query.keyword;
  if (keyword === undefined) {
    res.json(data);
  } else {
    const filteredData = {};
    for (const property in data) {
      // Only keep those with matching_terms that starts with the keyword
      filteredData[property] = data[property].filter((item) =>
        item["matching_terms"].some((str) => str.startsWith(keyword))
      );
    }
    res.json(filteredData);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
