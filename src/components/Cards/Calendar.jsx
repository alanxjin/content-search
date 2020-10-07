import React from "react";
import { Card } from "react-bootstrap";
import List from "./List";

const Calendar = ({ title, invitees, date }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <List label="Invitees" items={invitees.split(",")} />
        <Card.Text>
          <small className="text-muted">{date}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
