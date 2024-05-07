import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class Child2 extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: ""}
  }

  handleTarget = (event) => {
    this.setState({selected: event.target.value})
    console.log(event.target.value)
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    let data = this.props.data2;

    // Dropdown
    let categories = d3.map(data, d => d.category);
    let options = Array.from(new Set(categories));

    d3.select("#target")
      .selectAll("option")
      .data(options)
      .join("option")
      .text(function (d) {
        return d;
      });

    if (this.state.selected === "") {
      this.setState({selected: options[0]})
      d3.select("#target").attr('value', options[0])
    }

    let tooltip = d3.select("body").selectAll(".tooltip_div")
      .data([0])
      .join("div")
      .attr("class", "tooltip_div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "#ededed")
      .style("border", "1px solid black")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("font-size", "15px")

    // Filter data

    let filtered_data = data.filter(d => d.category === this.state.selected)

    let margin = {top: 20, right: 40, bottom: 50, left: 30},
      width = 1000 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    let container = d3.select("#scatter-plot")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // X-axis
    let x_data = filtered_data.map(d => d.x)
    let x_scale = d3.scaleLinear()
      .domain([0, d3.max(x_data)])
      .range([margin.left, width]);

    container.selectAll('.x-axis-g')
      .data([0])
      .join('g')
      .attr('class', 'x-axis-g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x_scale));

    // X-Axis Label
    container.selectAll('.x-axis-label')
      .data([0])
      .join('text')
      .attr('class', 'x-axis-label')
      .attr('x', width/2)
      .attr('y', height + margin.top+20)
      .attr('text-anchor', 'middle')
      .text('X');

    // Y-axis
    let y_data = filtered_data.map(d => d.y)
    let y_scale = d3.scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([height, margin.top]);

    container.selectAll('.y-axis-g')
      .data([0])
      .join('g')
      .attr('class', 'y-axis-g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y_scale));

    // Y-Axis Label
    container.selectAll('.y-axis-label')
      .data([0])
      .join('text')
      .attr('class', 'y-axis-label')
      .attr('transform', `translate(0, ${(height+margin.top)/2})`)
      .attr('text-anchor', 'middle')
      .text('Y');

    // Circles
    container.selectAll('circle')
      .data(filtered_data)
      .join('circle')
      .attr('cx', d => x_scale(d.x))
      .attr('cy', d => y_scale(d.y))
      .attr('r', 5)
      .attr('fill', '#69b3a2')
      .on('mouseover', (event, d) => {
        tooltip.style("visibility", "visible")
          .style("top", (event.pageY) + "px")
          .style("left", (event.pageX) + "px")
          .html(`x is : ${d.x}<br>y is : ${d.y}`)
      })
      .on('mousemove', (event) => {
        tooltip.style("top", (event.pageY) + "px")
          .style("left", (event.pageX) + "px")
      })
      .on('mouseout', () => {
        tooltip.style("visibility", "hidden")
      })
  }

  render() {
    return (
      <div class="scatter">
        <select class="" id="target" style={{width: '100px', display: 'block', margin: '0 auto', marginTop: '5px'}} onChange={this.handleTarget}></select>
        <svg width="500" height="300" id="scatter-plot">
          <g class="g_2"></g>
        </svg>
      </div>
    );
  }
}

export default Child2;
