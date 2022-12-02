import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import DropdownFunction from "./components/DropdownFunction";
import BeerTable from "./pages/BeerTable";
import CreateTable from "./pages/CreateTable";
import beerService from "./requests/beerService";

function App() {
  const [datx, setData] = useState();

  const updateFetch = () => beerService.getTables().then((data) => setData(data));

  useEffect(() => {
    beerService.getTables().then((data) => setData(data));
  }, []);

  return (
    <div className="App-header">
      <BrowserRouter>
        {datx && (
          <Routes>
            <Route path="/" element={<DropdownFunction tableList={datx.tables}></DropdownFunction>}></Route>
            <Route
              path="/createTable"
              element={<CreateTable updateFetch={updateFetch}></CreateTable>}></Route>
            <Route path="/:tableName" element={<BeerTable tableList={datx.tables}></BeerTable>}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
