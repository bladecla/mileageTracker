import React from 'react'
import PropTypes from 'prop-types'

const Trip = props => {
    const {start, end, date, forBusiness, vehicle} = props;
    const tripDist = end - start;
    return (
    <div className="trip">
      <span>{tripDist + " mi"}</span>
      <span>{forBusiness ? "Business" : "Personal"}</span>
      <span>{forBusiness ? "$" + (tripDist * 0.0545).toFixed(2) : "--"}</span>
      <span>{date}</span>
      <span>{vehicle}</span>
    </div>
  );
}
Trip.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    forBusiness: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date)
}

export default Trip;


