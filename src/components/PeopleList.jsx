import React, { useState } from "react";
import { GiBeerBottle } from "react-icons/gi";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Container from "react-bootstrap/Container";
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
    <Row className="pb-1 d-flex">
      <Col>
        <span>{person.name}</span>
        {person.bottles.map((beer) =>
          drawBottles(
            beer.amount,
            crates.filter((crate) => crate.id == beer.from_crate)[0].color
          )
        )}
      </Col>
      <Col xs="auto">
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
          <Button size="sm" variant="secondary" onClick={handleClick}>
            {buttonText}
          </Button>
        </OverlayTrigger>
      </Col>
    </Row>
  );
}

function PeopleList({ people, crates, handleAddBottle }) {
  return (
    <Container>
      {people.map((person, i) => (
        <Person
          person={person}
          key={i}
          crates={crates}
          handleAddBottle={handleAddBottle}></Person>
      ))}
    </Container>
  );
}

export default PeopleList;
