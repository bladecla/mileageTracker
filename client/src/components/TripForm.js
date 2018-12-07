import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'
import uuid from 'uuid';

const {form, error, body, checkbox, checked, unchecked, label, checkgroup} = style;

export default class TripForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            trip: this.props.isUpdate ? {
                start: this.props.start,
                end: this.props.end,
                isBusiness: this.props.isBusiness,
                date: this.props.date,
            } : {
                isBusiness: true
            },
            isTripValid: true,
            isDateValid: true
        };
    }
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        isUpdate: PropTypes.bool
    }

    submit = (e) => {
        e.preventDefault();
        if(this.validate()){
            const tripData = { ...this.state.trip };
            if (!this.props.isUpdate) {
                if (!this.state.trip.date) tripData.date = new Date();
                tripData._id = uuid();
            } else tripData._id = this.props._id;
            // console.log(tripData)
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

    onChange = (e) => this.setState({ 
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

    render() {
        const {isUpdate} = this.props;
        const {isBusiness, start, end, date} = this.state.trip;
        const checkCN = isBusiness ? "fa fa-check-square fa-2x" : "fa fa-square fa-2x";
        const cbStyle = isBusiness ? checked : unchecked;
        return (
            <React.Fragment>
                {!this.state.isTripValid && <p style={error}>Starting mileage must be less than ending mileage.</p>}
                {!this.state.isDateValid && <p style={error}>Date cannot be in the future.</p>}
                <div style={body}>
                    <form id="trip" onSubmit={this.submit} style={form}>
                        <input className="input" onChange={this.onChange} type="tel" name="start" placeholder="Starting mileage" value={start ? start : ""} required/>
                        <input className="input" onChange={this.onChange} type="tel" name="end" placeholder="Ending mileage" value={end ? end : ""} required/>
                        <input className="input" onChange={this.dateChange} type="date" name="date" value={date ? date : ""}/>
                        <div style={checkgroup}>
                            <i className={checkCN} onClick={this.checkBoxChange} style={{...checkbox, ...cbStyle}} ></i>
                            <label htmlFor={checkCN} style={label}>Business</label>
                        </div>
                    </form>
                </div>    
            </React.Fragment>
        )
    }
}
