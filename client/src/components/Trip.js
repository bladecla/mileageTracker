import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import style from './styles/trip.css';

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSelected: false,
      isMouseOver: false,
      deletePending: false,
    }
  }
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    isBusiness: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date)
  }
  
  openDeleteModal = () => this.setState({ deletePending: true });
  closeDeleteModal = () => this.setState({ deletePending: false, shouldDelete: false });
  delete = (e) => {
    e.preventDefault();
    this.closeDeleteModal();
    this.props.delete(this.props._id)
  }
  select = () => this.setState({ isSelected: !this.state.isSelected });
  mouseIn = () => this.setState({ isMouseOver: true })
  mouseOut = () => this.setState({ isMouseOver: false })
  processDate = (inputDate) => {
    let weekdays, day, month, date, year;
    weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    day = weekdays[inputDate.getDay()];
    month = inputDate.getMonth() + 1;
    date = inputDate.getDate();
    year = inputDate.getFullYear();
    return `${day} ${month}-${date}-${year}`;
  }
  nothing = () => false; //prevents annoying console errors. Remove for production
  
  render(){
    const {start, end, date, isBusiness, vehicle} = this.props;
    const { deletePending, isSelected, isMouseOver} = this.state;
    const {earnings, gray, p} = style;
    const tripDist = end - start;
    const styledDate = date ? this.processDate(date) : "";
    return (
      <div className={isSelected ? "isSelected trip" : "trip"} onClick={this.select} onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut}>
        <input type="checkbox" onChange={this.nothing} checked={isSelected}/>
        <span>{tripDist + " mi"}</span>
        <span>{isBusiness ? "Business" : "Personal"}</span>
        <span style={isBusiness ? earnings : {}}>
          {isBusiness ? "$" + (tripDist * 0.0545).toFixed(2) : "--"}
        </span>
        <span>{styledDate}</span>
        <span>{vehicle}</span>
        {isMouseOver && <i className="fa fa-pencil" style={gray}></i>}
        {isMouseOver && <i className="fa fa-times" onClick={this.openDeleteModal} style={gray}></i>}
        {deletePending && 
          <Modal title="Confirm Deletion" formName="delete" label="Delete This Trip" close={this.closeDeleteModal}>
            <form id="delete" onSubmit={this.delete}>
              <p style={p}>Are you sure you want to delete this trip?</p>
              <input type="hidden" name="a" value="b"/>
            </form>
          </Modal>}
      </div>
    );
  } 
}

export default Trip;