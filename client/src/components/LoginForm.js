import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormWrapper from './FormWrapper';
import modal from './styles/modal.css'
import formStyle from './styles/form.css'

const { form, body } = formStyle;

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { register } = this.props;
    return (
      <div style={{...modal.overlay, backgroundColor: "transparent"}}>
        <FormWrapper formName="login" title={register ? "Sign Up" : "Sign In"} label={register ? "Register" : "Log in"}>
          <div style={{...body, height: "100px"}}>
            <form id="login" style={form}>
              {register && 
              <input className="input" type="text" name="name" placeholder="Your Name"/>
              }
              <input className="input" type="email" name="email" placeholder="email address"/>
              <input className="input" type="password" name="password" placeholder="password"/>
            </form>
          </div>
        </FormWrapper>
      </div>
    )
  }
}
