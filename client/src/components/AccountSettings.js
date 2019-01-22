import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ChangeEmail, ChangePassword } from './SettingsForms';
import { changePassword, changeEmail } from '../redux/actions/userActions';


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
    const { changePassword, changeEmail } = this.props;
    return (
      <div>
        <ChangeEmail onSubmit={changeEmail} email={email} />
        <br/>
        <ChangePassword onSubmit={changePassword} email={email} />
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = { changePassword, changeEmail }

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)