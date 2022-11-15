import React, { useState } from "react";
import CrateContainer from "./CrateContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownFunction from "./DropdownFunction";
import PeopleList from "./PeopleList";
import Container from "react-bootstrap/Container";

function Home({ data }) {
  const [table, settable] = useState();
  const [selected, setselected] = useState(false);
  const tableList = data["tables"];

  const handleDropdown = (e) => {
    settable(tableList.find((table) => table.id == e));
    setselected(e == -1 ? false : true);
  };

  function handleAddCrate(data) {
    var tableCopy = JSON.parse(JSON.stringify(table));
    data = { id: tableCopy.crates.length + 1, ...data };
    tableCopy.crates.push(data);
    settable(tableCopy);
  }

  function handleAddPerson(name) {
    const people = table.people;
    const person = { name: name, bottles: [] };
    people.push(person);
    settable({ ...table, people });
  }

  function handleAddBottle(person, crateId) {
    const people = table.people;
    const crates = table.crates;
    const crate = crates.findIndex((crate) => crate.id == crateId);
    if (crates[crate].numBottles > 0) {
      crates[crate].numBottles--;
      //Could be simplified using above findIndex
      for (let i = 0; i < people.length; i++) {
        if (people[i].name === person) {
          let bottles = people[i].bottles;
          let bot = bottles.filter((bottle) => bottle.from_crate == crateId);
          if (bot.length === 0) {
            people[i].bottles.push({ from_crate: crateId, amount: 1 });
          } else {
            people[i].bottles[bot[0].from_crate - 1].amount++;
          }
          break;
        }
      }
      settable({ ...table, people, crates });
    }
  }

  return (
    <Container>
      <DropdownFunction
        handleDropdown={handleDropdown}
        tableList={tableList}></DropdownFunction>
      {selected ? (
        <>
          <CrateContainer
            crates={table.crates}
            handleAddData={handleAddCrate}></CrateContainer>
          <PeopleList
            people={table.people}
            crates={table.crates}
            handleAddBottle={handleAddBottle}
            handleAddPerson={handleAddPerson}></PeopleList>
        </>
      ) : null}
    </Container>
  );
}

export default Home;
