import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3';

function DonutGraph(props) {
  let { width, height, data, innerRadius, outerRadius } = props;
  let color = ["red", "blue"]
  let pie = d3.pie();
  let graph = pie(data);
  let arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  let arcs = data.map((d, i) => arc({startAngle: graph[i].startAngle, endAngle: graph[i].endAngle }))
  console.log(graph)
  return (
      <svg width={width} height={height}>
        <g transform={`translate(${width/2},${height/2})`}>
          {arcs.map((arc, i) => <g key={i}><path d={arc} fill={color[i]}></path></g> )}
        </g>
      </svg>
  )
}

DonutGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
}

export default DonutGraph

