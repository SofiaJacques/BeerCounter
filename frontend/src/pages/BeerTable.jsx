import React, { useState } from "react";
import CrateContainer from "../components/CrateContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import PeopleList from "../components/PeopleList";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import beerService from "../requests/beerService";
import AddPerson from "../components/AddPerson";

export default function BeerTable({ tableList }) {
  const par = useParams();

  const tableIndex = tableList.findIndex((table) => table.name === par.tableName);
  console.log("BeerTable render");
  const [crates, setCrates] = useState(tableList[tableIndex].crates);
  const [people, setPeople] = useState(tableList[tableIndex].people);

  function handleAddCrate(crate) {
    beerService.addCrate("Bugwiser", crate).then(setCrates);
    setCrates([...crates, crate]);
  }

  function handleAddPerson(name) {
    const person = { name: name, bottles: [] };
    setPeople([...people, person]);
  }

  function handleAddBottle(person, crateId, sign) {
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
    }
  }

  return (
    <Container>
      <CrateContainer crates={crates} handleAddData={handleAddCrate}></CrateContainer>
      {people.length > 0 && (
        <PeopleList
          people={people}
          crates={crates}
          handleAddBottle={handleAddBottle}
          handleAddPerson={handleAddPerson}></PeopleList>
      )}
      <AddPerson handleAddPerson={handleAddPerson}></AddPerson>
    </Container>
  );
}
