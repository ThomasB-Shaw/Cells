import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Color extends React.Component {
  state = {
    brand: '',
    color: ''
  }

  handleChange = (event, typeOfKey) => {
    console.log('There was a change!');
    this.setState({
        ...this.state,
        [typeOfKey]: event.target.value
    })
    console.log(this.state);
}

submitClick = () => {
  this.props.dispatch({ type:"ADD_PAINTING_COMPONENT", payload: this.state })
  // this.props.history.push('/edit');
}


  render() {
    return (
      <div className='color'>
        <label htmlFor='color'>
          Brand:
          <input type='text' placeholder='Brand' onChange={(event) => this.handleChange(event, 'brand')}/>
          Color:
          <input type='text' placeholder='Color' onChange={(event) => this.handleChange(event, 'color')}/>
        </label>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Color);