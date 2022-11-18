import React from "react";
import CreateCrate from "./CreateCrate";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { TiBeer } from "react-icons/ti";

function Crate(crate) {
  return (
    <Col>
      <h4>{crate.data.brand}</h4>
      <TiBeer style={{ color: crate.data.color }} size={"100px"}></TiBeer>
      <div>Owner: {crate.data.owner}</div>
      <div>Price: {crate.data.price}€</div>
      <div>Left: {crate.data.numBottles}</div>
    </Col>
  );
}

function CrateContainer({ crates, handleAddData }) {
  return (
    <div>
      <Row style={{ alignItems: "center" }} className="mb-5">
        {crates.map((crate) => (
          <Crate key={crate.id} data={crate}></Crate>
        ))}
        <Col>
          <CreateCrate handleAddData={handleAddData}></CreateCrate>
        </Col>
      </Row>
    </div>
  );
}

export default CrateContainer;
