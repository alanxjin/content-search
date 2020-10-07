import React, { useState } from "react";
import "./App.css";
import {
  Search,
  CalendarCard,
  DropboxCard,
  ContactsCard,
  SlackCard,
  TwitterCard,
} from "./components";
import { Tabs, Tab, Alert } from "react-bootstrap";

const defaultData = {
  contacts: [],
  calendar: [],
  slack: [],
  dropbox: [],
  tweet: [],
};
function App() {
  const [contentType, setContentType] = useState("contacts");
  const [data, setData] = useState(defaultData);
  return (
    <div className="App">
      <header className="App-header">
        <p>ACME Search</p>
      </header>
      <Search />
      <Tabs activeKey={contentType} onSelect={(type) => setContentType(type)}>
        <Tab eventKey="contacts" title="Contacts">
          {data.contacts.length > 0 ? (
            data.contacts.map((info) => {
              return <ContactsCard key={info.id} {...info} />;
            })
          ) : (
            <Alert variant="danger">No data available!</Alert>
          )}
        </Tab>
        <Tab eventKey="dropbox" title="DropBox Files">
          {data.dropbox.length > 0 ? (
            data.dropbox.map((info) => {
              return <DropboxCard key={info.id} {...info} />;
            })
          ) : (
            <Alert variant="danger">No data available!</Alert>
          )}
        </Tab>
        <Tab eventKey="slack" title="Slack message/thread">
          {data.slack.length > 0 ? (
            data.slack.map((info) => {
              return <SlackCard key={info.id} {...info} />;
            })
          ) : (
            <Alert variant="danger">No data available!</Alert>
          )}
        </Tab>
        <Tab eventKey="calendar" title="Calendar Entry">
          {data.calendar.length > 0 ? (
            data.calendar.map((info) => (
              <CalendarCard key={info.id} {...info} />
            ))
          ) : (
            <Alert variant="danger">No data available!</Alert>
          )}
        </Tab>
        <Tab eventKey="tweet" title="Twitter">
          {data.tweet.length > 0 ? (
            data.tweet.map((info) => <TwitterCard key={info.id} {...info} />)
          ) : (
            <Alert variant="danger">No data available!</Alert>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
