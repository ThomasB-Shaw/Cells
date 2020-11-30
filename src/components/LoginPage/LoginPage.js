import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css'

class LoginPage extends Component {
  render() {
    return (
      <>
      <div className='loginPageBackground'>
          <LoginForm />
      </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
