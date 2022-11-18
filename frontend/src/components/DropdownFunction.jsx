import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function DropdownFunction({ handleDropdown, tableList }) {
  const [selectText, setselectText] = useState("Join Table");
  function handleSelect(e) {
    handleDropdown(e);
    setselectText(e == -1 ? "Create Table" : "Table # " + e);
  }
  return (
    <DropdownButton
      className="pb-2"
      id="dropdown-basic-button"
      variant="secondary"
      title={selectText}
      onSelect={handleSelect}>
      {tableList.map((table) => (
        <Dropdown.Item key={table.id} eventKey={table.id}>
          Table #{table.id}
        </Dropdown.Item>
      ))}
      <Dropdown.Item key={-1} eventKey={-1}>
        Create Table
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default DropdownFunction;