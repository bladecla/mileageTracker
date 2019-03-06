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
    const {totalMileage, totalTrips, businessTrips, businessMiles} = this.props, 
        percentBusinessMiles = totalMileage ? ((businessMiles / totalMileage) * 100).toFixed(1) : 0, 
        percentBusinessTrips = totalMileage ? ((businessTrips / totalTrips) * 100).toFixed(1) : 0,
        personalMiles = totalMileage - businessMiles,
        personalTrips = totalTrips - businessTrips;
        
    return (
      <div className="pane" style={{alignItems: "center"}}>
        {totalTrips > 0 
        ?
        <div style={{display: "flex", height: "200px", justifyContent: "space-around"}}>
        <DonutGraph label={"Miles"} width={800} height={800} data={[businessMiles, personalMiles]} innerRadius={200} outerRadius={400} />
        <DonutGraph label={"Trips"} width={800} height={800} data={[businessTrips, personalTrips]} innerRadius={200} outerRadius={400} />
          <div style={{display: "flex", flexDirection: "column", alignSelf: "center"}}>
            <h4 style={{marginTop: "1rem"}}>{totalMileage + " mi | $" + (businessMiles * 0.0545).toFixed(2)}</h4>
            <div>{"Mileage: " + percentBusinessMiles + "% Business (" + businessMiles + " mi) | " + (100 - percentBusinessMiles).toFixed(1) + "% Personal (" + (personalMiles) + " mi)"}</div>
            <div>{"Trips: " + percentBusinessTrips + "% Business (" + businessTrips + ") | " + (100 - percentBusinessTrips).toFixed(1) + "% Personal (" + (personalTrips) + ")"}</div>
          </div>
        </div>
        :
        <p>Trip statistics will appear here.</p>}
      </div>
    )
  }
}
