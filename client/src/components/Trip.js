import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Trip extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      selected: false
    }
  }

  select = () => this.setState({ selected: !this.state.selected })

  render(){
    const {start, end, date, isBusiness, vehicle} = this.props;
    const { selected } = this.state;
    const tripDist = end - start;
    return (
        <div className={selected ? "selected trip" : "trip"} onClick={this.select}>
          <input type="checkbox" checked={selected}/>
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