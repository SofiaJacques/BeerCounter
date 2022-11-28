import React, { useReducer, useState } from "react";
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

  const [buttonText, setbuttonText] = useReducer(
    (buttonText) => (buttonText === "+" ? "-" : "+"),
    "+"
  );

  function handleSelect(e) {
    setselectedColor({ color: colors[e - 1].color, id: e });
  }

  function handleAddBeer(sign) {
    handleAddBottle(person.name, selectedCrate.id, sign);
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

  function drawAmountBeer(bottleN, crate) {
    return (
      <>
        <GiBeerBottle style={{ color: crate.color }}></GiBeerBottle>:{"\u00A0"}
        {(crate.price / crate.totalBottles) * bottleN}€
      </>
    );
  }

  function showInformation() {
    var elem = document.getElementById(person.name);
    if (elem.style.display === "none") {
      elem.style.display = "";
    } else {
      elem.style.display = "none";
    }
  }

  const totalBeers = (bottles) => {
    var sum = 0;
    bottles.forEach((bottle) => {
      sum = sum + bottle.amount;
    });
    return sum;
  };

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
        <div className="d-grid">
          <Button
            className="gBtn"
            size="sm"
            variant="secondary"
            onClick={() => handleAddBeer("+")}>
            +
          </Button>
          <Button
            className="gBtn"
            size="sm"
            variant="secondary"
            onClick={() => handleAddBeer("-")}>
            -
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Row className="pb-1 pt-1 d-flex align-items-center">
        <Col xs={2} onClick={showInformation} style={{ cursor: "pointer" }}>
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
            <Button size="sm" variant="secondary" onClick={setbuttonText}>
              {buttonText}
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
      <Row
        className="rounded h5"
        style={{ display: "none", backgroundColor: "#434957", fontWeight: 300 }}
        id={person.name}>
        <Col>Total beers: {totalBeers(person.bottles)}</Col>
        {person.bottles.map((beer) => (
          <Col>
            {drawAmountBeer(
              beer.amount,
              crates.filter((crate) => crate.id == beer.from_crate)[0]
            )}
          </Col>
        ))}
      </Row>
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
      <p className="h6" style={{ fontWeight: 200 }}>
        <em>Click on your name for more information!</em>
      </p>
    </div>
  );
}

export default PeopleList;
