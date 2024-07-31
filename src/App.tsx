import React from "react";
import PathFinder from "./components/PathFinder";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Path Finder</h1>
      <div>
        <p>Use the buttons or keyboard arrows to follow the path!</p>
      </div>
      <PathFinder />
    </div>
  );
};

export default App;
