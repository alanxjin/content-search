import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const CreateNewForm = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [emails, setEmails] = useState("");
  const [phones, setPhones] = useState("");
  const [matching_terms, setMatching] = useState("");

  const onSubmit = () => {
    const contact = {
      name,
      company,
      emails,
      phones,
      matching_terms,
    };
    axios
      .post("/api/contacts", contact)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create new contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name*</Form.Label>
            <Form.Control
              required
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control
              placeholder="Enter company"
              onChange={(event) => {
                setCompany(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Emails</Form.Label>
            <Form.Control
              placeholder="Enter emails"
              onChange={(event) => {
                setEmails(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              separate multiple emails by ","
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Numbers</Form.Label>
            <Form.Control
              placeholder="Enter phone numbers"
              onChange={(event) => {
                setPhones(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              separate multiple phone numbers by ","
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Matching Terms*</Form.Label>
            <Form.Control
              required
              placeholder="Enter matching terms"
              onChange={(event) => {
                setMatching(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              separate multiple matching terms by ","
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSubmit();
            handleClose();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNewForm;
