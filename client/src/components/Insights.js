import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DonutGraph from './DonutGraph';

export default class Insights extends Component {
  static propTypes = {
    totalMileage: PropTypes.number.isRequired,
    totalTrips: PropTypes.number.isRequired,
    businessMiles: PropTypes.number.isRequired,
    businessTrips: PropTypes.number.isRequired,
  }

  render() {
    const {totalMileage, totalTrips, businessTrips, businessMiles} = this.props;
    const percentBusinessMiles = ((businessMiles / totalMileage) * 100).toFixed(1);
    const percentBusinessTrips = ((businessTrips / totalTrips) * 100).toFixed(1);
    return (
      <div className="pane">
        <h4 style={{marginTop: "1rem"}}>{totalMileage + " mi | $" + (businessMiles * 0.0545).toFixed(2)}</h4>
        <div>{"Mileage: " + percentBusinessMiles + "% Business (" + businessMiles + " mi) | " + (100 - percentBusinessMiles).toFixed(1) + "% Personal (" + (totalMileage - businessMiles) + " mi)"}</div>
        <div>{"Trips: " + percentBusinessTrips + "% Business (" + businessTrips + ") | " + (100 - percentBusinessTrips).toFixed(1) + "% Personal (" + (totalTrips - businessTrips) + ")"}</div>
        <DonutGraph width={1000} height={1000} data={[100, 200]} innerRadius={200} outerRadius={400} />
      </div>
    )
  }
}
