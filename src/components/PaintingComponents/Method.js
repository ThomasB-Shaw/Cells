import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Method extends Component {
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

addClick = (event, typeOfKey) => {
  // this.props.dispatch({ type:"ADD_PAINTING_COMPONENT", payload: this.state });
  
  console.log('There was a add!');
    this.setState({
        ...this.state,
        [typeOfKey]: [...this.state.typeOfKey, event.target.value]
    })
    console.log(this.state);
}


  render() {
    return (
      <div className='paintingComponent'>
        <label htmlFor='method'>
          Method:
          <input type='text' placeholder='Method' onChange={(event) => this.props.handleChange(event, 'method')}/>
        </label>
        <button onClick={this.props.addClick}>Add</button>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Method);