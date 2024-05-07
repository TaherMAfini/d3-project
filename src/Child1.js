import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class Child1 extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate() {
    let self = this
    let data = this.props.data1

    let selected = "category"

    let grouped_data = d3.flatRollup(
      data,
      v => v.length,
      d => d[selected]
    )
    
    let margin = {top: 20, right: 40, bottom: 50, left: 20},
      width = 500 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    let container = d3.select("#bar-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // X-axis  
    let x_data = grouped_data.map(d => d[0])
    let x_scale = d3.scaleBand()
      .domain(x_data)
      .rangeRound([margin.left, width])
      .padding(0.2);

    container.selectAll(".x-axis-g")
      .data([0])
      .join("g")
      .attr("class", "x-axis-g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x_scale))
      .attr('font-size', '12px');

    // Y-axis
    let y_data = grouped_data.map(d => d[1])
    let y_scale = d3.scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([height, 0]);

    // Bars
    container.selectAll("rect")
        .data(grouped_data)
        .join("rect")
        .attr("x", d => x_scale(d[0]))
        .attr("y", d => y_scale(d[1]))
        .attr("width", x_scale.bandwidth())
        .attr("height", d => height - y_scale(d[1]))
        .attr("fill", "#69b3a2");
    
      // Bar Labels
      container.selectAll(".bar-label")
          .data(grouped_data)
          .join("text")
          .attr("class", "bar-label")
          .attr("x", d => x_scale(d[0]) + x_scale.bandwidth() / 2)
          .attr("y", d => y_scale(d[1]) + 15)
          .attr("text-anchor", "middle")
          .text(d => d[1].toFixed(2))
          .attr("fill", "#black");

      // X-axis Label
      container.selectAll("x-axis-label")
          .data([0])
          .join("text")
          .attr("class", "x-axis-label")
          .attr("x", width / 2)
          .attr("y", height + 40)
          .attr("text-anchor", "middle")
          .text("categories")
          .attr('font-size', '15px')
    

  }

  render() {
    return (
      <div class="barChart">
        <svg id="bar-chart">
          <g className="g_1"></g>
        </svg>
      </div>
    );
  }
}

export default Child1;
