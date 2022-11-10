import "./App.css";
import data from "./data/data.json";
import Home from "./components/Home";

function App() {
  return (
    <div className="App-header">
      <Home data={data}></Home>
    </div>
  );
}

export default App;
