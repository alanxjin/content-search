import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Search,
  CalendarCard,
  DropboxCard,
  ContactsCard,
  SlackCard,
  TwitterCard,
} from "./components";
import { Tabs, Tab, Alert } from "react-bootstrap";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5001";
const defaultData = {
  contacts: [],
  calendar: [],
  slack: [],
  dropbox: [],
  tweet: [],
};
let socket;
function App() {
  const [contentType, setContentType] = useState("contacts");
  const [data, setData] = useState(defaultData);
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState("");
  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.on("Search", (data) => {
      setData(data);
    });
    return () => socket.disconnect();
  }, []);

  // Normal api call. (not used after switching to websocket)
  const getResult = () => {
    axios
      .get(`/api/search?keyword=${keyword}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Websocket set up.
  const sendQuery = () => {
    console.log("Query sent");
    socket.emit("Search", keyword);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>ACME Search</p>
      </header>
      <Search
        keyword={keyword}
        inputOnChange={setKeyword}
        buttonOnClick={sendQuery}
      />
      <Tabs activeKey={contentType} onSelect={(type) => setContentType(type)}>
        <Tab eventKey="contacts" title="Contacts">
          {data.contacts.length > 0 ? (
            data.contacts.map((info) => {
              return <ContactsCard key={info.id} {...info} />;
            })
          ) : (
            <Alert variant="primary">No data available.</Alert>
          )}
        </Tab>
        <Tab eventKey="dropbox" title="DropBox Files">
          {data.dropbox.length > 0 ? (
            data.dropbox.map((info) => {
              return <DropboxCard key={info.id} {...info} />;
            })
          ) : (
            <Alert variant="primary">No data available.</Alert>
          )}
        </Tab>
        <Tab eventKey="slack" title="Slack message/thread">
          {data.slack.length > 0 ? (
            data.slack.map((info) => {
              return <SlackCard key={info.id} {...info} />;
            })
          ) : (
            <Alert variant="primary">No data available.</Alert>
          )}
        </Tab>
        <Tab eventKey="calendar" title="Calendar Entry">
          {data.calendar.length > 0 ? (
            data.calendar.map((info) => (
              <CalendarCard key={info.id} {...info} />
            ))
          ) : (
            <Alert variant="primary">No data available.</Alert>
          )}
        </Tab>
        <Tab eventKey="tweet" title="Twitter">
          {data.tweet.length > 0 ? (
            data.tweet.map((info, ind) => <TwitterCard key={ind} {...info} />)
          ) : (
            <Alert variant="primary">No data available.</Alert>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
