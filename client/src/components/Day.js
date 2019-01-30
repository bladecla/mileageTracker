import React from 'react'
import PropTypes from 'prop-types'

const Day = props => {
  const { date, tripIds, select } = props;
  
  function selectAll(){
    select(tripIds);
  }

  return (
    <div className="day trip">
      <input onChange={selectAll} type="checkbox" />
      <span>{date}</span>
    </div>
  )
}

Day.propTypes = {
  date: PropTypes.string.isRequired,
  tripIds: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired
}

export default Day
