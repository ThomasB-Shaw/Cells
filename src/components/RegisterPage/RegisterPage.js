import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div className='registerPageBackground'>
        <RegisterForm />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
