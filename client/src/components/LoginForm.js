import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormWrapper from './FormWrapper';
import modal from './styles/modal.css'
import formStyle from './styles/form.css'
import { connect } from 'react-redux'
import { login, register } from "./../redux/actions/userActions"
import LoggedRedirect from './LoggedRedirect';

const { form, body, error } = formStyle;

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
    const { isRegister, register, login, close } = this.props;
    const submit = isRegister ? register : login;
    submit({...this.state});
    if (close) close();
  }

  onChange = ({target}) => {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { isRegister, close } = this.props;
    const { authFailed, loggedIn } = this.props.user;
    return (
      loggedIn ? <LoggedRedirect to="/"/> :
      <div style={{...modal.overlay, backgroundColor: "transparent"}}>
        <FormWrapper formName="login" title={isRegister ? "Sign Up" : "Sign In"} label={isRegister ? "Register" : "Log in"} close={close}>
          {authFailed && <p style={error}>{isRegister ? "Account already exists." : "You are not logged in."}</p>}
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