import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './styles/form.css'

export default class TripForm extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }

    log = (e) => {
    e.preventDefault();
    for (let prop in this.state) console.log(prop, this.state[prop]);
    this.props.onSubmit();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <div style={style.body}>    
                    <form id="trip" onSubmit={this.log} style={style.form}>
                        <input className="input" onChange={this.onChange} type="tel" name="start" placeholder="Starting mileage"/>
                        <input className="input" onChange={this.onChange} type="tel" name="end" placeholder="Ending mileage"/>
                        <div>
                            <label htmlFor="isBusiness">Business</label>
                            <input type="checkbox" name="isBusiness" defaultChecked/>
                        </div>
                    </form>
                </div>    
            </React.Fragment>
        )
    }
}
