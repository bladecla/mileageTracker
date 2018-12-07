import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'
import uuid from 'uuid';

const {form, error, body, checkbox, checked, unchecked, label, checkgroup} = style;

export default class TripForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            trip: {
                isBusiness: this.props.isBusiness === true
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
            const newTrip = { ...this.state.trip };
            if (!this.state.trip.date) newTrip.date = new Date();
            newTrip._id = uuid();
            this.props.onSubmit(newTrip);
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
        const {isUpdate, start, end, date} = this.props;
        const isChecked = this.state.trip.isBusiness;
        const checkCN = isChecked ? "fa fa-check-square fa-2x" : "fa fa-square fa-2x";
        const cbStyle = isChecked ? checked : unchecked;
        return (
            <React.Fragment>
                {!this.state.isTripValid && <p style={error}>Starting mileage must be greater than ending mileage.</p>}
                {!this.state.isDateValid && <p style={error}>Date cannot be in the future.</p>}
                <div style={body}>
                    <form id="trip" onSubmit={this.submit} style={form}>
                        <input className="input" onChange={this.onChange} type="tel" name="start" placeholder="Starting mileage" value={isUpdate ? start : ""} required/>
                        <input className="input" onChange={this.onChange} type="tel" name="end" placeholder="Ending mileage" value={isUpdate ? end : ""} required/>
                        <input className="input" onChange={this.dateChange} type="date" name="date" value={isUpdate ? date : null}/>
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
