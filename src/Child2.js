import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class Child2 extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div class="scatter">
        <svg width="500" height="300" id="scatter-plot"></svg>
      </div>
    );
  }
}

export default Child2;
