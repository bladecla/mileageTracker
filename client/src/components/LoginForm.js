import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormWrapper from './FormWrapper';
import modal from './styles/modal.css'
import formStyle from './styles/form.css'
import { connect } from 'react-redux'
import { login, register } from "./../redux/actions/userActions";

const { form, body } = formStyle;

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }
  static propTypes = {
    isRegister: PropTypes.bool.isRequired
  }

  onSubmit = e => {
    e.preventDefault();
    const { isRegister, register, login } = this.props;
    const submit = isRegister ? register : login;
    submit({...this.state})
  }

  onChange = ({target}) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { isRegister } = this.props;
    return (
      <div style={{...modal.overlay, backgroundColor: "transparent"}}>
        <FormWrapper formName="login" title={isRegister ? "Sign Up" : "Sign In"} label={isRegister ? "Register" : "Log in"}>
          <div style={{...body, height: isRegister ? "150px" : "100px"}}>
            <form id="login" onSubmit={this.onSubmit} style={form}>
              {isRegister && 
              <input className="input" onChange={this.onChange} type="text" name="name" placeholder="Your Name"/>
              }
              <input className="input" onChange={this.onChange} type="email" name="email" placeholder="email address"/>
              <input className="input" onChange={this.onChange} type="password" name="password" placeholder="password"/>
            </form>
          </div>
        </FormWrapper>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = { login, register }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)