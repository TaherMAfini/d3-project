import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col">
            <h1>Column 1</h1>
          </div>
          <div className="col">
            <h1>Column 2</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
