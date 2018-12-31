import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3';

function DonutGraph(props) {
  let { width, height, data, innerRadius, outerRadius, label } = props;
  let color = d3.scaleOrdinal(["lightgreen", "blue"])
  let pie = d3.pie().startAngle(3 * Math.PI / 4).endAngle(-3 * Math.PI / 4).sort(null)
  let graph = pie(data);
  let arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  let arcs = data.map((d, i) => arc({startAngle: graph[i].startAngle, endAngle: graph[i].endAngle }));
  return (
      <svg width="50%" viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(${width/2},${height/2})`}>
          {label && <text textAnchor="middle" fontSize="4em">{label}</text>}
          {arcs.map((arc, i) => <g key={i}><path d={arc} fill={color(i)}></path></g> )}
        </g>
      </svg>
  )
}

DonutGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  label: PropTypes.string
}

export default DonutGraph

