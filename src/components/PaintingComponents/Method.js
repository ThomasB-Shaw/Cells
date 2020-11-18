import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Method extends React.Component {
  state = {
    method: '',
  }

  handleChange = (event, typeOfKey) => {
    console.log('There was a change!');
    this.setState({
        ...this.state,
        [typeOfKey]: event.target.value
    })
    console.log(this.state);
}

addClick = () => {
  this.props.dispatch({ type:"ADD_PAINTING_COMPONENT", payload: this.state });
}


  render() {
    return (
      <div className='paintingComponent'>
        <label htmlFor='method'>
          Method:
          <input type='text' placeholder='Method' onChange={(event) => this.handleChange(event, 'method')}/>
        </label>
        <button onClick={this.addClick}>Add</button>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Method);