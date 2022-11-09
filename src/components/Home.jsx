import React, { useState } from "react";
import CrateContainer from "./CrateContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownFunction from "./DropdownFunction";
import PeopleList from "./PeopleList";

function Home({ data }) {
  const [table, settable] = useState();
  const [selected, setselected] = useState(false);
  const tableList = data["tables"];

  const handleDropdown = (e) => {
    settable(tableList.find((table) => table.id == e));
    setselected(e == -1 ? false : true);
  };

  function handleAddData(data) {
    var tableCopy = JSON.parse(JSON.stringify(table));
    data = { id: tableCopy.crates.length + 1, ...data };
    tableCopy.crates.push(data);
    settable(tableCopy);
  }

  function handleAddBottle(person, color) {
    const people = table.people;
    for (let i = 0; i < people.length; i++) {
      if (people[i].name === person) {
        let bottles = people[i].bottles;
        let bot = bottles.filter((bottle) => bottle.from_crate == color);
        if (bot.length === 0) {
          people[i].bottles.push({ from_crate: color, amount: 1 });
        } else {
          people[i].bottles[bot[0].from_crate - 1].amount++;
        }
        break;
      }
    }
    settable({ ...table, people });
  }

  return (
    <div>
      <DropdownFunction
        handleDropdown={handleDropdown}
        tableList={tableList}></DropdownFunction>
      {selected ? (
        <>
          <CrateContainer crates={table.crates} handleAddData={handleAddData}></CrateContainer>
          <PeopleList
            people={table.people}
            crates={table.crates}
            handleAddBottle={handleAddBottle}></PeopleList>
        </>
      ) : null}
    </div>
  );
}

export default Home;
