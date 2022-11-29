import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import beerService from "../requests/beerService";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function CreateTable({ updateFetch }) {
  const [tableName, setTableName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
  }
  function createTable() {
    beerService
      .addTable(tableName)
      .then(() => updateFetch())
      .then(() => navigate(`/${tableName}`))
      .catch((error) => setError(error.message));
  }
  return (
    <>
      <Form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="d-flex">
          <Form.Control
            type="input"
            name="Name"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Table name"
            className="m-2"></Form.Control>
          <Button variant="secondary" onClick={createTable}>
            Create Table
          </Button>
        </div>
        {error.length > 0 && (
          <Alert variant="danger" style={{ fontSize: "19px" }} className="m-2">
            Error: {error}
          </Alert>
        )}
      </Form>
    </>
  );
}
