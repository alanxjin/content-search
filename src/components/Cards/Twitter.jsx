import React from "react";
import { Card } from "react-bootstrap";

const Twitter = ({ user, message, timestamp }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{user}</Card.Title>
        <Card.Text>{message}</Card.Text>
        <Card.Text>
          <small className="text-muted">{timestamp}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Twitter;
