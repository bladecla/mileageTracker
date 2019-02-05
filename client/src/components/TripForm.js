import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addVehicle } from './../redux/actions/vehicleActions'
import { addTrip, updateTrip } from './../redux/actions/tripActions'
import style from './styles/form.css'
import { stringifyDate, JSONtoDateObject } from './../helpers';
import AddVehicle from './AddVehicle';
import ErrorMsg from './ErrorMsg';

const {form, error, body, checkbox, checked, unchecked, label, checkgroup} = style;

class TripForm extends Component {
    constructor(props){
        super(props);
        // TODO: use object spread
        this.state = {
            trip: this.props.isUpdate ? {
                _id: this.props._id,
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
            showVehicleForm: false
        };
    }
    static propTypes = {
        close: PropTypes.func,
        isUpdate: PropTypes.bool,
        _id: PropTypes.string,
        start: PropTypes.number,
        end: PropTypes.number,
        isBusiness: PropTypes.bool,
        date: PropTypes.instanceOf(Date),
        vehicle: PropTypes.string,
    }

    submit = (e) => {
        // TODO: handle add vehicle on submit
        e.preventDefault();
        if(this.validate()){
            const tripData = { ...this.state.trip };
            const { addTrip, updateTrip, close, isUpdate } = this.props;
            const onSubmit = isUpdate ? updateTrip : addTrip;
            if (!this.state.trip.date) tripData.date = new Date()
            onSubmit(tripData);
            if (close) close();
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

    dateChange = ({ target }) => this.setState({ trip: { ...this.state.trip, date: JSONtoDateObject(target.value) } });
    
    vehicleChange = ({ target }) => {
        const { value } = target;
        if (value) this.setState({
            trip: {...this.state.trip, vehicle: value }
        });
    }

    toggleVehicleForm = () => this.setState({ showVehicleForm: !this.state.showVehicleForm })

    render() {
        const { showVehicleForm, isTripValid, isDateValid } = this.state;
        const { addVehicle } = this.props;
        const { isBusiness, start, end, date, vehicle } = this.state.trip;

        const dateString = date ? stringifyDate(date) : "";
        const checkCN = isBusiness ? "fa fa-check-square fa-2x" : "fa fa-square fa-2x";
        const cbStyle = isBusiness ? checked : unchecked;
        return (
            <React.Fragment>
                {!isDateValid && <ErrorMsg>Date cannot be in the future.</ErrorMsg>}
                {!isTripValid && <ErrorMsg>Starting mileage must be less than ending mileage.</ErrorMsg>}
                <div style={body}>
                    <form id="trip" onSubmit={this.submit} style={form}>
                        <input className="input" onChange={this.mileageChange} type="tel" name="start" placeholder="Starting mileage" value={start ? start : ""} required/>
                        <input className="input" onChange={this.mileageChange} type="tel" name="end" placeholder="Ending mileage" value={end ? end : ""} required/>
                        <input className="input" onChange={this.dateChange} type="date" name="date" value={dateString}/>
                        <select className="input" onChange={this.vehicleChange} name="vehicle" value={vehicle ? vehicle : ""}>
                            <option value="">Select Vehicle</option>
                            {this.props.vehicles.vehicles.map((v, idx) => <option key={idx} value={v}>{v}</option>)}
                        </select>
                        <AddVehicle show={showVehicleForm} toggle={this.toggleVehicleForm} addVehicle={addVehicle}/>   
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

const mapStateToProps = (state) => ({
  vehicles: state.vehicles,
})

const mapDispatchToProps = { addVehicle, addTrip, updateTrip }

export default connect(mapStateToProps, mapDispatchToProps)(TripForm)