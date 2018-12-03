import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'

export default class TripForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isBusiness: true
        }
    }
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }

    submit = (e) => {
        e.preventDefault();
        const newTrip = { ...this.state };
        this.props.onSubmit(newTrip);
        this.props.close();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: parseFloat(e.target.value)
        })
    }

    checkBoxChange = () => {
        this.setState({
            isBusiness: !this.state.isBusiness
        })
    }



    render() {
        return (
            <React.Fragment>
                <div style={style.body}>    
                    <form id="trip" onSubmit={this.submit} style={style.form}>
                        <input className="input" onChange={this.onChange} type="tel" name="start" placeholder="Starting mileage"/>
                        <input className="input" onChange={this.onChange} type="tel" name="end" placeholder="Ending mileage"/>
                        <div>
                            <label htmlFor="isBusiness">Business</label>
                            <input type="checkbox" onChange={this.checkBoxChange} name="isBusiness" checked={this.state.isBusiness}/>
                        </div>
                    </form>
                </div>    
            </React.Fragment>
        )
    }
}
