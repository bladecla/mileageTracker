import React from 'react'
import PropTypes from 'prop-types'

const Day = props => {
  const { date, trips, select, selected } = props;
  const unselected = trips.filter(trip => !selected.find(t => t._id === trip._id))
  const checked = unselected.length === 0;

  function selectAll(){
    if (checked) return select(trips, false);
    select(unselected);
  }

  return (
    <div className="day">
      <input onChange={selectAll} type="checkbox" checked={checked} />
      <span>{date}</span>
    </div>
  )
}

Day.propTypes = {
  date: PropTypes.string.isRequired,
  trips: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired
}

export default Day
