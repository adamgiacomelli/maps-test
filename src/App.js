import React, { Component } from "react";
import Map from "./map.js";
import "./App.css";

class App extends Component {
  render() {
    console.log(window);
    return <Map height={window.innerHeight} width={window.innerWidth} />;
  }
}

export default App;
