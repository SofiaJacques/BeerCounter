class beerService {
  async getTables() {
    const response = await fetch("/api/tables");
    const content = await response.json();
    console.log("content", content);
    return content;
  }

  addTable(tableName) {
    return this.serverRequestGeneric("/api/tables", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableName: tableName }),
    });
  }

  //increese beer count for person, decrease beer count for crate
  updateBeerCount(tableName, crateId, personName, increase) {
    return this.serverRequestGeneric(`api/tables/${tableName}`, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crateId: crateId, personName: personName, increase: increase }),
    });
  }

  //Adding new  crate. To return full crate data
  //Table name: Bugwiser
  addCrate(tableName, crate) {
    return this.serverRequestGeneric("/api/crates", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableName: tableName, crateData: crate }),
    });
  }

  updateCrate(tableId) {
    return fetch("/api/crate", { method: "PUT", body: { tableId: tableId } }).then((response) =>
      response.json()
    );
  }

  //to return full people list
  addPerson(tableName, personData) {
    return this.serverRequestGeneric("/api/people", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableName: tableName, personData: personData }),
    });
  }
  //update beer count for person and for crate
  updatePerson(tableId, crateId, personName) {
    return fetch(`/api/people:${personName}`, {
      method: "PUT",
      body: { tableId: tableId, crateId: crateId, personName: personName },
    }).then((response) => response.json());
  }

  //fetchURL: url
  //options: { }
  serverRequestGeneric(fetchURL, options) {
    return new Promise((resolve, reject) => {
      fetch(fetchURL, options)
        .then(this.parseJSON)
        .then((result) => {
          if (result.ok) return resolve(result.json);
          else return reject(result.json);
        });
    });
  }

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
}

export default new beerService();
