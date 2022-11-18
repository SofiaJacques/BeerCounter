import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export function InputButton({ handleSubmit }) {
  const [name, setname] = useState();
  const handleChange = (event) => setname(event.target.value);

  function handleButton() {
    handleSubmit(name);
    setname("");
  }
  return (
    <InputGroup className="mb-1 w-auto">
      <Form.Control
        placeholder="Name"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        value={name}
        onChange={handleChange}
      />
      <Button variant="outline-secondary" id="button-addon2" onClick={handleButton}>
        Add new person
      </Button>
    </InputGroup>
  );
}
