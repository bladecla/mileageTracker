import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'
import uuid from 'uuid';
import { stringifyDate } from './../helpers';

const {form, error, body, checkbox, checked, unchecked, label, checkgroup, addCar, plus, subform} = style;

export default class TripForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            trip: this.props.isUpdate ? {
                start: this.props.start,
                end: this.props.end,
                isBusiness: this.props.isBusiness,
                date: this.props.date,
                vehicle: this.props.vehicle
            } : {
                isBusiness: true
            },
            isTripValid: true,
            isDateValid: true,
            showVehicleForm: false,
            newVehicleName: ""
        };
    }
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        addVehicle: PropTypes.func.isRequired,
        isUpdate: PropTypes.bool,
        vehicles: PropTypes.array,
        start: PropTypes.number,
        end: PropTypes.number,
        date: PropTypes.instanceOf(Date),
        vehicle: PropTypes.string,
    }

    submit = (e) => {
        e.preventDefault();
        if(this.validate()){
            const tripData = { ...this.state.trip };
            if (!this.state.trip.date) tripData.date = new Date();
            if (this.props.isUpdate) tripData._id = this.props._id;
            this.props.onSubmit(tripData);
            this.props.close();
        }
    }

    validate = () => {
        const { start, end, date } = this.state.trip;
        const validTrip = start < end;
        const validDate = date ? date.getTime() <= Date.now() : true;
            
        this.setState({
            isTripValid: validTrip,
            isDateValid: validDate
        });
        return validTrip && validDate;
    }

    mileageChange = (e) => this.setState({ 
        trip: { ...this.state.trip, [e.target.name]: parseFloat(e.target.value)} 
    });

    checkBoxChange = () => this.setState({ 
        trip: { ...this.state.trip, isBusiness: !this.state.trip.isBusiness } 
    });

    dateChange = (e) => {
        const [ year, month, day ] = e.target.value.split('-').map(str => parseInt(str));
        this.setState({
            trip: { ...this.state.trip, date: new Date(year, month - 1, day) }
        });
    }

    vehicleChange = (e) => {
        const value = e.target.value;
        if (value) this.setState({
            trip: {...this.state.trip, vehicle: value }
        });
    }

    toggleVehicleForm = () => this.setState({ showVehicleForm: !this.state.showVehicleForm})

    newVehicleNameChange = (e) => this.setState({ newVehicleName: e.target.value });

    addVehicle = () => {
        const newVehicle = this.state.newVehicleName;
        if (newVehicle) this.props.addVehicle(newVehicle);
        this.setState({ trip: {...this.state.trip, vehicle: newVehicle} })
        this.toggleVehicleForm();
    }

    render() {
        const {isBusiness, start, end, date, vehicle} = this.state.trip;
        const dateString = date ? stringifyDate(date) : "";
        const checkCN = isBusiness ? "fa fa-check-square fa-2x" : "fa fa-square fa-2x";
        const cbStyle = isBusiness ? checked : unchecked;
        return (
            <React.Fragment>
                {!this.state.isTripValid && <p style={error}>Starting mileage must be less than ending mileage.</p>}
                {!this.state.isDateValid && <p style={error}>Date cannot be in the future.</p>}
                <div style={body}>
                    <form id="trip" onSubmit={this.submit} style={form}>
                        <input className="input" onChange={this.mileageChange} type="tel" name="start" placeholder="Starting mileage" value={start ? start : ""} required/>
                        <input className="input" onChange={this.mileageChange} type="tel" name="end" placeholder="Ending mileage" value={end ? end : ""} required/>
                        <input className="input" onChange={this.dateChange} type="date" name="date" value={dateString}/>
                        <select className="input" onChange={this.vehicleChange} name="vehicle" value={vehicle ? vehicle : ""}>
                            <option value="">Select Vehicle</option>
                            {this.props.vehicles.map((v, idx) => <option key={idx} value={v}>{v}</option>)}
                        </select>
                        {!this.state.showVehicleForm ?
                            <div className="icon" onClick={this.toggleVehicleForm} style={addCar}>
                                <i className="fa fa-plus-circle" style={plus}></i><span>Add Vehicle</span>
                            </div>
                        : 
                        <div style={subform}>
                            <input onChange={this.newVehicleNameChange} type="text" name="new-vehicle" placeholder="Nickname (e.g. 'Nissan')"  />
                            <i onClick={this.addVehicle} className="icon fa fa-plus-circle" style={plus}></i>
                        </div>    
                        }    
                        <div style={checkgroup}>
                            <i className={checkCN} onClick={this.checkBoxChange} style={{...checkbox, ...cbStyle}} ></i>
                            <label htmlFor={checkCN} style={label}>{isBusiness ? "Business" : "Personal"}</label>
                        </div>
                    </form>
                </div> 
            </React.Fragment>
        )
    }
}
