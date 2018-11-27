import React from 'react'
import PropTypes from 'prop-types'

const Trip = props => {
    const {start, end, date, type, vehicle} = props;
    return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <span>{end - start + "mi"}</span>
      <span>{date}</span>
      <span>{type}</span>
    </div>
  );
}
Trip.propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date)
}

export default Trip


