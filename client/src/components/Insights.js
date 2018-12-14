import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
        <div>{"Mileage: " + percentBusinessMiles + "% Business | " + (100 - percentBusinessMiles) + "% Personal"}</div>
        <div>{"Trips: " + percentBusinessTrips + "% Business | " + (100 - percentBusinessTrips) + "% Personal"}</div>
      </div>
    )
  }
}
