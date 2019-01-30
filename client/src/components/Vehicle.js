import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeleteModal from './DeleteModal'

export default class Vehicle extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isDeleteModalOpen: false,
      isUpdateFormOpen: false
    }
  }
  
  static propTypes = {
    vehicle: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
  }

  onChange = ({ target }) => this.setState({ [target.name]: target.value }) 

  toggleDeleteModal = () => this.setState({isDeleteModalOpen: !this.state.isDeleteModalOpen})
  toggleUpdateForm = () => this.setState({isUpdateFormOpen: !this.state.isUpdateFormOpen})

  update = () => {
    const { vehicle, update } = this.props;
    const { updateVehicle } = this.state;
    if (!updateVehicle) return this.toggleUpdateForm();
    if (updateVehicle.length < 33) {
      update(vehicle, updateVehicle);
      this.toggleUpdateForm();
    } 
  }

  delete = e => {
    e.preventDefault();
    this.toggleDeleteModal();
    this.props.delete(this.props.vehicle)
  }

  render() {
    const { vehicle } = this.props;
    const { isUpdateFormOpen, updateVehicle } = this.state;
    return (
      <React.Fragment>
        <div className="vehicle">
          { isUpdateFormOpen
            ? <input className="input" onChange={this.onChange} 
            type="text" name="updateVehicle" placeholder="Vehicle Nickname" 
            value={updateVehicle ? updateVehicle : vehicle} />
            : <span>{vehicle}</span>
          }
          { isUpdateFormOpen
            ? <i className="fa fa-plus-circle icon" onClick={this.update}></i>
            : <i className="fa fa-pencil icon" onClick={this.toggleUpdateForm}></i>
          }
          <i className="fa fa-times icon" onClick={this.toggleDeleteModal}></i>
        </div>
        {this.state.isDeleteModalOpen && 
        <DeleteModal resourceName={"This Vehicle"} close={this.toggleDeleteModal} onSubmit={this.delete}
        />}
      </React.Fragment>
    )
  }
}
