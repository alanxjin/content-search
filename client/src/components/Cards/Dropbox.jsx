import React from "react";
import { Card } from "react-bootstrap";
import List from "./List";

const Dropbox = ({ title, path, shared_with = [], created }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{path}</Card.Text>
        <List label={"Shared with"} items={shared_with} />
        <Card.Text>
          <small className="text-muted">{`Created: ${created}`}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Dropbox;
