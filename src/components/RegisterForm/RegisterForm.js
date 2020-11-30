import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <Form className="formPanel" onSubmit={this.registerUser}>
      <FormGroup> 
        <h2>Register</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
          <div>
            <Label htmlFor="username">
              Username:
              <Input
                type="text"
                name="username"
                value={this.state.username}
                required
                onChange={this.handleInputChangeFor('username')}
              />
            </Label>
        </div>
        <div>
          <Label htmlFor="password">
            Password:
            <Input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </Label>
        </div>
        <div>
          <Button color="success" onClick={this.registerUser}>Register</Button>
        </div>
      </FormGroup>
      <center>
        <h5>Already have an account?</h5>
        <Button
          color="link"
          onClick={() => {
            this.props.history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </Form>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(RegisterForm));
