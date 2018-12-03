import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Trip extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      isSelected: false,
      isMouseOver: false
    }
  }
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    isBusiness: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date)
  }

  select = () => this.setState({ isSelected: !this.state.isSelected });

  mouseIn = () => this.setState({ isMouseOver: true })
  mouseOut = () => this.setState({ isMouseOver: false })

  //prevents annoying console errors. Remove for production
  nothing = () => false;

  render(){
    const {start, end, date, isBusiness, vehicle} = this.props;
    const { isSelected } = this.state;
    const tripDist = end - start;
    return (
        <div className={isSelected ? "isSelected trip" : "trip"} onClick={this.select} onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut}>
          <input type="checkbox" onChange={this.nothing} checked={isSelected}/>
          <span>{tripDist + " mi"}</span>
          <span>{isBusiness ? "Business" : "Personal"}</span>
          <span style={isBusiness ? {color: "rgb(0,200,0)"} : {}}>
            {isBusiness ? "$" + (tripDist * 0.0545).toFixed(2) : "--"}
          </span>
          <span>{date ? processDate(date) : ""}</span>
          <span>{vehicle}</span>
          {this.state.isMouseOver && <i class="fa fa-times" onClick={this.props.delete} style={{color: "gray"}}></i>}
        </div>
    );
  } 
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