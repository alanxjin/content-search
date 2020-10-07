import React from "react";
import { Card } from "react-bootstrap";

const Slack = ({ author, channel, message, timestamp }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{author}</Card.Title>
        <Card.Text>{channel}</Card.Text>
        <Card.Text>{message}</Card.Text>
        <Card.Text>
          <small className="text-muted">{timestamp}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Slack;
