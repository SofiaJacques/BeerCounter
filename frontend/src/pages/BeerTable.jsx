import React, { useState } from "react";
import CrateContainer from "../components/CrateContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import PeopleList from "../components/PeopleList";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import beerService from "../requests/beerService";
import AddPerson from "../components/AddPerson";

export default function BeerTable({ tableList }) {
  const params = useParams();

  const tableIndex = tableList.findIndex((table) => table.name === params.tableName);
  console.log("BeerTable render");
  const [crates, setCrates] = useState(tableList[tableIndex].crates);
  const [people, setPeople] = useState(tableList[tableIndex].people);

  function handleAddCrate(crate) {
    beerService
      .addCrate(params.tableName, crate)
      .then((data) => setCrates([...crates, data.json]))
      .catch((error) => console.log(error.message));
  }

  function handleAddPerson(name) {
    const personData = { name: name, bottles: [] };
    beerService
      .addPerson(params.tableName, personData)
      .then((data) => setPeople([...people, data.json]))
      .catch((error) => console.log(error.message));
    //setPeople([...people, person]);
  }

  //true: increase bottle for person. false: decrease bottle for person
  function handleAddBottle(person, crateId, increase) {
    beerService
      .updateBeerCount(params.tableName, crateId, person, increase)
      .then((data) => {
        setPeople(data.json.people);
        setCrates(data.json.crates);
      })
      .catch((error) => console.log(error.message));

    // const crate = crates.findIndex((crate) => crate.id == crateId);
    // if (crates[crate].numBottles > 0) {
    //   crates[crate].numBottles--;
    //   //Could be simplified using above findIndex
    //   for (let i = 0; i < people.length; i++) {
    //     if (people[i].name === person) {
    //       let bottles = people[i].bottles;
    //       let bot = bottles.filter((bottle) => bottle.from_crate == crateId);
    //       if (bot.length === 0) {
    //         people[i].bottles.push({ from_crate: crateId, amount: 1 });
    //       } else {
    //         people[i].bottles[bot[0].from_crate - 1].amount++;
    //       }
    //       break;
    //     }
    //   }
    // }
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
