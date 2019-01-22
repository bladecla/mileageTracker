import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ChangeEmail, ChangePassword } from './SettingsForms';
import { changeCredentials } from '../redux/actions/userActions';


class AccountSettings extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  static propTypes = {
    prop: PropTypes.object
  }

  render() {
    const { email } = this.props.user;
    const { changeCredentials } = this.props;
    return (
      <div>
        <ChangeEmail onSubmit={changeCredentials} email={email} />
        <br/>
        <ChangePassword onSubmit={changeCredentials} email={email} />
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = { changeCredentials }

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)