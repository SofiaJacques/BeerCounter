import "./App.css";
import data from "./data/data.json";
import Home from "./components/Home";
import { useState, useEffect } from "react";

function App() {
  const [datx, setData] = useState(null);
  useEffect(() => {
    fetch("/api/tables")
      .then((response) => response.json())
      .then(setData);
  }, []);
  console.log(datx);

  return (
    <div className="App-header">
      <pre>{JSON.stringify(datx, null, 2)}</pre>
      <Home data={data}></Home>
    </div>
  );
}

export default App;
