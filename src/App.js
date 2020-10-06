import React, { useState } from "react";
import "./App.css";
import { Search } from "./components";
import { Tabs, Tab } from "react-bootstrap";
import Calendar from "./components/Cards/Calendar";

const data = {
  contacts: [],
  calendar: [
    {
      id: "12345",
      title: "Acme Proposal Meeting",
      invitees: "dave, john, bob, carol",
      matching_terms: ["dave", "john", "bob", "carol", "acme"],
      date: "2019-01-10 10:00:00",
    },
    {
      id: "12346",
      title: "Acme Final Delivery Meeting",
      invitees: "dave, john, bob, alice",
      matching_terms: ["dave", "john", "bob", "alice", "acme"],
      date: "2019-03-01 11:00:00",
    },
  ],
  slack: [],
  dropbox: [],
  tweet: [],
};
function App() {
  const [contentType, setContentType] = useState("contacts");
  return (
    <div className="App">
      <header className="App-header">
        <p>ACME Search</p>
      </header>
      <Search />
      <Tabs activeKey={contentType} onSelect={(type) => setContentType(type)}>
        <Tab eventKey="contacts" title="Contacts">
          Contacts
        </Tab>
        <Tab eventKey="dropbox" title="DropBox Files">
          DropBox Files
        </Tab>
        <Tab eventKey="slack" title="Slack message/thread">
          Slack message/thread
        </Tab>
        <Tab eventKey="calendar" title="Calendar Entry">
          {data.calendar.map((info) => (
            <Calendar key={info.id} {...info} />
          ))}
        </Tab>
        <Tab eventKey="tweet" title="Twitter">
          Twitter
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
