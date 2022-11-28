class beerService {
  parseJSON(response) {
    return new Promise((resolve) =>
      response.json().then((json) =>
        resolve({
          status: response.status,
          ok: response.ok,
          json,
        })
      )
    );
  }

  async getTables() {
    const response = await fetch("/api/tables");
    const content = await response.json();
    console.log("content", content);
    return content;
  }
  addTable(tableName) {
    return new Promise((resolve, reject) => {
      fetch("/api/tables", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableName: tableName }),
      })
        .then(this.parseJSON)
        .then((result) => {
          if (result.ok) return resolve(result.json);
          else return reject(result.json);
        });
    });
  }
  // const response = await fetch("/api/tables", {
  //   method: "POST",
  //   mode: "cors",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ tableName: tableName }),
  // });
  // if (!response.ok) {
  //   const message = await response.json();
  //   throw new Error(message.message);
  // }
  // const table = await response.json();
  // return table;

  //increese beer count for person, decrease beer count for crate
  updateBeerCount(tableId, crateId, personName) {
    return [this.updateCrate(tableId, crateId), this.updatePerson(tableId, crateId, personName)];
  }

  //Adding new  crate. To return full crate data
  //Table name: Bugwiser
  addCrate(tableName, crate) {
    return fetch("/api/crates", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableName: "Bugwiser", crateData: crate }),
    }).then((response) => response.json());
  }

  updateCrate(tableId) {
    return fetch("/api/crate", { method: "PUT", body: { tableId: tableId } }).then((response) =>
      response.json()
    );
  }

  //to return full people list
  addPerson(tableId, person) {
    return fetch("/api/people", {
      method: "POST",
      body: { tableID: tableId, person: person },
    }).then((response) => response.json());
  }
  //update beer count for person and for crate
  updatePerson(tableId, crateId, personName) {
    return fetch(`/api/people:${personName}`, {
      method: "PUT",
      body: { tableId: tableId, crateId: crateId, personName: personName },
    }).then((response) => response.json());
  }
}
export default new beerService();
