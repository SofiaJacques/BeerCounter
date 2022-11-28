import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";
import beerService from "../requests/beerService";

function DropdownFunction({ tableList }) {
  return (
    <DropdownButton className="pb-2" id="dropdown-basic-button" variant="secondary" title="Join Table">
      {tableList.map((table) => (
        <Link key={table.name} to={table.name} className="dropdown-item">
          {table.name}
        </Link>
      ))}
      <Link key={-1} to={"createTable"} className="dropdown-item">
        Create a Table
      </Link>
    </DropdownButton>
  );
}

export default DropdownFunction;
