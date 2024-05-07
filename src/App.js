import React, { Component } from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";
import "./App.css";
import dataset from "./SampleDataset.csv"
import * as d3 from "d3";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {data: []}
  }

  componentDidMount() {
    let self = this
    d3.csv(dataset, function(d) {
      return {
        x: parseInt(d.x),
        y: parseInt(d.y),
        category: d.category
      }
    }).then(function (csv_data) {
      self.setState({data: csv_data})
      console.log(csv_data)
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col">
            <Child1 data1={this.state.data}/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Child2 data2={this.state.data}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
