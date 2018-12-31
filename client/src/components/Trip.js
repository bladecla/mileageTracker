import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import TripForm from './TripForm';
import { processDate } from './../helpers';
import style from './styles/trip.css';

const {earnings, p, gray} = style;

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSelected: false,
      isMouseOver: false,
      deletePending: false,
      updatePending: false
    }
  }
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    isBusiness: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date),
    vehicle: PropTypes.string,
    delete: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
  }
  
  toggleSelect = () => this.setState({ isSelected: !this.state.isSelected });
  mouseIn = () => this.setState({ isMouseOver: true })
  mouseOut = () => this.setState({ isMouseOver: false })
  openDeleteModal = () => this.setState({ deletePending: true, isMouseOver: false });
  closeDeleteModal = () => this.setState({ deletePending: false });
  openUpdateModal = () => this.setState({ updatePending: true, isMouseOver: false });
  closeUpdateModal = () => this.setState({ updatePending: false });
  delete = (e) => {
    e.preventDefault();
    this.closeDeleteModal();
    this.props.delete(this.props._id)
  }

  nothing = () => false; //prevents annoying console errors. Remove for production
  
  render(){
    const {start, end, date, isBusiness, vehicle, _id, addVehicle, vehicles} = this.props;
    const trip = {_id, start, end, isBusiness, vehicle, date};
    const { deletePending, updatePending, isSelected, isMouseOver} = this.state;
    const tripDist = end - start;
    const styledDate = date ? processDate(date) : "";
    return (
      <React.Fragment>
        <div className={isSelected ? "isSelected trip" : "trip"} onClick={this.toggleSelect} onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut}>
          <input type="checkbox" onChange={this.nothing} checked={isSelected}/>
          <span>{tripDist + " mi"}</span>
          <span>{isBusiness ? "Business" : "Personal"}</span>
          <span style={isBusiness ? earnings : {}}>
            {isBusiness ? "$" + (tripDist * 0.0545).toFixed(2) : "--"}
          </span>
          <span style={gray}>{styledDate}</span>
          <span>{vehicle}</span>
          {isMouseOver && <i className="fa fa-pencil icon" onClick={this.openUpdateModal}></i>}
          {isMouseOver && <i className="fa fa-times icon" onClick={this.openDeleteModal}></i>}
        </div>
        {deletePending && 
          <Modal title="Delete Trip?" formName="delete" label="Delete This Trip" close={this.closeDeleteModal}>
            <form id="delete" onSubmit={this.delete}>
              <p style={p}>Are you sure you want to delete this trip?</p>
              <input type="hidden" name="a" value="b"/>
            </form>
          </Modal>}
        {updatePending &&
          <Modal title="Update Trip" formName="trip" label="Update Trip" close={this.closeUpdateModal}>
            <TripForm isUpdate={true} onSubmit={this.props.update} close={this.closeUpdateModal} addVehicle={addVehicle} vehicles={vehicles} {...trip}/>
          </Modal>
        }
      </React.Fragment>
    );
  } 
}

export default Trip;