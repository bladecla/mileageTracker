import React from 'react'
import PropTypes from 'prop-types'

const Trip = props => {
  const {start, end, date, isBusiness, vehicle} = props;
  const tripDist = end - start;
  return (
    <div className="trip">
      <span>{tripDist + " mi"}</span>
      <span>{isBusiness ? "Business" : "Personal"}</span>
      <span style={isBusiness ? {color: "rgb(0,200,0)"} : {}}>
        {isBusiness ? "$" + (tripDist * 0.0545).toFixed(2) : "--"}
      </span>
      <span>{date ? processDate(date) : ""}</span>
      <span>{vehicle}</span>
    </div>
  );
}

Trip.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  isBusiness: PropTypes.bool.isRequired,
  date: PropTypes.instanceOf(Date)
}

const processDate = (inputDate) => {
  let weekdays, day, month, date, year;
  weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  day = weekdays[inputDate.getDay()];
  month = inputDate.getMonth() + 1;
  date = inputDate.getDate();
  year = inputDate.getFullYear();

  return `${day} ${month}-${date}-${year}`;
}

export default Trip;