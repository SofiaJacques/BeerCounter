import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import beerService from "../requests/beerService";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function CreateTable({ updateFetch }) {
  const [tableName, setTableName] = useState(undefined);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }
  function createTable() {
    beerService
      .addTable(tableName)
      .then(() => console.log("success"))
      .catch((status, err) => {
        console.log("error");
        console.log(err);
      });
    // const submit = fetch("/api/tables", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ tableName: tableName }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(response.json());
    //     }
    //     return response.json();
    //   })
    //   .then((data) => console.log(data))
    //   .then(() => console.log("navigate"))
    //   .catch((error) => console.log(error.message));

    // const submit = beerService.addTable(tableName).catch((error) => setError({ error: error.message }));
    // submit.then((data) => console.log(data));
    // .then((data) => console.log("data", data))
    // .then(console.log("update fetch"))
    // .then(console.log("navigate") /*navigate(`/${tableName}`)*/);
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
          {!submitted && (
            <Button variant="secondary" onClick={createTable}>
              Create Table
            </Button>
          )}
          {submitted && (
            <Button variant="secondary" onClick={createTable}>
              Go to the new table!
            </Button>
          )}
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
