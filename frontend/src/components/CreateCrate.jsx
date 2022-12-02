import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CrateCrate({ handleAddData }) {
  const defaultInput = {
    brand: "",
    owner: "",
    color: "#3D7B4F",
    numBottles: null,
    price: null,
  };
  const [show, setShow] = useState(false);
  const [input, setInput] = useState(defaultInput);

  const handleClose = () => {
    setShow(false);
    setInput(defaultInput);
  };

  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    var missingInfo = false;
    Object.values(input).forEach((element) => {
      if (element === "" || element === null) {
        missingInfo = true;
        return false;
      }
    });
    if (missingInfo) return alert("Please complete all information to submit");
    else {
      handleAddData(input);
      handleClose();
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Add crate
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Beer crate details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <FloatingLabel as={Col} controlId="nameInput" label="Brand name">
                <Form.Control
                  type="input"
                  name="brand"
                  value={input.brand}
                  onChange={handleInputChange}
                  placeholder="Brand name"></Form.Control>
              </FloatingLabel>
              <FloatingLabel as={Col} controlId="personInput" label="Who Payed?">
                <Form.Control
                  type="input"
                  name="owner"
                  value={input.owner}
                  onChange={handleInputChange}
                  placeholder="Who payed?"></Form.Control>
              </FloatingLabel>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="colorPicker">
                <Form.Control
                  type="color"
                  name="color"
                  value={input.color}
                  title="Choose your color"
                  onChange={handleInputChange}></Form.Control>
                <Form.Label>Beer color</Form.Label>
              </Form.Group>
              <FloatingLabel as={Col} controlId="numberInput" label="N. of bottles">
                <Form.Control
                  type="number"
                  name="numBottles"
                  value={input.numBottles}
                  onChange={handleInputChange}
                  placeholder="N. of bottles"></Form.Control>
              </FloatingLabel>
              <FloatingLabel as={Col} controlId="priceInput" label="Price">
                <Form.Control
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={handleInputChange}
                  placeholder="Price"></Form.Control>
              </FloatingLabel>
            </Row>
            <Row className="justify-content-end">
              <Col className="col-auto">
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CrateCrate;
