import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Calendar = ({ title, invitees, date }) => {
  console.log(title);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{invitees}</Card.Text>
        <Card.Text>{date}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
