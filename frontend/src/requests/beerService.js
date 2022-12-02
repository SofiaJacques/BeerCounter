class beerService {
  async getTables() {
    const response = await fetch("/api/tables");
    const content = await response.json();
    return content;
  }

  /**
   * Creates a new table. Cannot have empty name or existing name
   * @param {*} tableName
   * @returns
   */
  addTable(tableName) {
    return this.serverRequestGeneric("/api/tables", "POST", { tableName: tableName });
  }

  /**
   * Modifies beer count for a single person - also modifies crate total beers left count
   * @param {*} tableName
   * @param {*} crateId
   * @param {*} personName
   * @param {boolean} increase increase:[true|false] -> [increases|decreases] beer count for a person
   * @returns [updated person list data, updated crate list data]
   */
  updateBeerCount(tableName, crateId, personName, increase) {
    return this.serverRequestGeneric(`api/tables/${tableName}`, "PUT", {
      crateId: crateId,
      personName: personName,
      increase: increase,
    });
  }

  /**
   * Adds a new crate to the table.
   * @param {String} tableName
   * @param {Object} crate Full crate object
   * @returns Promise containing the created crate data
   */
  addCrate(tableName, crate) {
    return this.serverRequestGeneric("/api/crates", "POST", { tableName: tableName, crateData: crate });
  }

  updateCrate(tableId) {
    return fetch("/api/crate", { method: "PUT", body: { tableId: tableId } }).then((response) =>
      response.json()
    );
  }

  /**
   * Add a new person to the table
   * @param {String} tableName
   * @param {Object} personData full person object
   * @returns Promise containing the created person data
   */
  addPerson(tableName, personData) {
    return this.serverRequestGeneric("/api/people", "POST", { tableName: tableName, personData: personData });
  }
  //update beer count for person and for crate
  updatePerson(tableId, crateId, personName) {
    return;
  }

  /**
   * Generic api request
   * @param  fetchURL api call url
   * @param  method GET, POST, PUT or DELETE
   * @return {Promise} Returns promise containing json message returned from the server
   */
  serverRequestGeneric(fetchURL, method, body) {
    return new Promise((resolve, reject) => {
      fetch(fetchURL, {
        method: method,
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
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
