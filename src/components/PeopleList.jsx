import React, { useState } from "react";
import { GiBeerBottle } from "react-icons/gi";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { InputButton } from "./FormElements";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Person({ person, crates, handleAddBottle }) {
  const colors = crates.map((item) => ({ color: item.color, id: item.id }));
  const [selectedCrate, setselectedColor] = useState({
    color: colors[0].color,
    id: colors[0].id,
  });

  const [buttonText, setbuttonText] = useState("+");

  function handleSelect(e) {
    setselectedColor({ color: colors[e - 1].color, id: e });
  }

  function handleAddBeer() {
    handleAddBottle(person.name, selectedCrate.id);
  }

  function handleClick() {
    setbuttonText(buttonText === "+" ? "-" : "+");
  }

  function drawBottles(bottleN, color) {
    return (
      <>
        {[...Array(bottleN).keys()].map((x) => (
          <GiBeerBottle key={x} style={{ color: color }}></GiBeerBottle>
        ))}
      </>
    );
  }

  function showInformation() {}

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="d-flex">
        <DropdownButton
          variant="light"
          id="dropdown-basic-button"
          title={<GiBeerBottle color={selectedCrate.color}></GiBeerBottle>}
          onSelect={(event) => handleSelect(event)}>
          {colors.map((color) => (
            <Dropdown.Item eventKey={color.id}>
              <GiBeerBottle color={color.color} size="2em"></GiBeerBottle>
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Button size="sm" variant="secondary" onClick={handleAddBeer}>
          +
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Row className="pb-1 d-flex align-items-center">
        <Col xs={2} onClick={showInformation}>
          <span>{person.name}</span>
        </Col>
        <Col xs={8} sm={9}>
          {person.bottles.map((beer) =>
            drawBottles(
              beer.amount,
              crates.filter((crate) => crate.id == beer.from_crate)[0].color
            )
          )}
        </Col>
        <Col xs={2} sm={1} className="d-flex justify-content-end">
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={handleClick}>
              {buttonText}
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
      <Row id={person.name}></Row>
    </>
  );
}

function PeopleList({ people, crates, handleAddBottle, handleAddPerson }) {
  return (
    <div>
      {people.map((person, i) => (
        <Person
          person={person}
          key={i}
          crates={crates}
          handleAddBottle={handleAddBottle}></Person>
      ))}
      <Row className="mt-2 d-flex justify-content-end">
        <InputButton handleSubmit={handleAddPerson}></InputButton>
      </Row>
    </div>
  );
}

export default PeopleList;
