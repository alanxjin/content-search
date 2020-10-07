import React from "react";
import { Card } from "react-bootstrap";
import List from "./List";

const Contacts = ({
  name,
  company,
  emails = [],
  phones = [],
  last_contact,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{company}</Card.Text>
        <List label={"Emails"} items={emails} />
        <List label={"Phones"} items={phones} variant="info" />
        <Card.Text>
          <small className="text-muted">{`Last Contact: ${last_contact}`}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Contacts;
