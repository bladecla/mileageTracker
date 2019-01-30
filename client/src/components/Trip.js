import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import TripForm from './TripForm';
import { processDate } from './../helpers';
import style from './styles/trip.css';
import DeleteModal from './DeleteModal';

const {earnings, gray} = style;

class Trip extends Component {
  constructor(props){
    super(props);
    this.state = {
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
    selected: PropTypes.bool.isRequired,
    select: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  }
  
  toggleSelect = () => {
    const {start, end, date, isBusiness, vehicle, _id, select} = this.props;
    select({_id, start, end, isBusiness, vehicle, date})
  };
  mouseIn = () => this.setState({ isMouseOver: true })
  mouseOut = () => this.setState({ isMouseOver: false })
  openDeleteModal = () => this.setState({ deletePending: true, isMouseOver: false });
  closeDeleteModal = () => this.setState({ deletePending: false });
  openUpdateModal = () => this.setState({ updatePending: true, isMouseOver: false });
  closeUpdateModal = () => this.setState({ updatePending: false });
  delete = e => {
    e.preventDefault();
    this.closeDeleteModal();
    this.props.delete(this.props._id)
  }

  nothing = () => false; //prevents annoying console errors. Remove for production
  
  render(){
    const {start, end, date, isBusiness, vehicle, _id, selected} = this.props;
    const trip = {_id, start, end, isBusiness, vehicle, date};
    const { deletePending, updatePending, isMouseOver} = this.state;
    const tripDist = end - start;
    return (
      <React.Fragment>
        <div className={selected ? "selected trip" : "trip"} onClick={this.toggleSelect} onMouseEnter={this.mouseIn} onMouseLeave={this.mouseOut}>
          <input type="checkbox" onChange={this.nothing} checked={selected}/>
          <span>{tripDist + " mi"}</span>
          <span>{isBusiness ? "Business" : "Personal"}</span>
          <span style={isBusiness ? earnings : {}}>
            {isBusiness ? "$" + (tripDist * 0.0545).toFixed(2) : "--"}
          </span>
          <span>{vehicle}</span>
          {isMouseOver && <i className="fa fa-pencil icon" onClick={this.openUpdateModal}></i>}
          {isMouseOver && <i className="fa fa-times icon" onClick={this.openDeleteModal}></i>}
        </div>
        {deletePending && <DeleteModal resourceName="This Trip" close={this.closeDeleteModal} onSubmit={this.delete}/>}
        {updatePending &&
          <Modal title="Edit Trip" formName="trip" label="Update Trip" close={this.closeUpdateModal}>
            <TripForm isUpdate={true} close={this.closeUpdateModal} {...trip}/>
          </Modal>
        }
      </React.Fragment>
    );
  } 
}

export default Trip;