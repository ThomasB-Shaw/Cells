import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Method extends Component {
  state = {
    tool: '',
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
  this.props.dispatch({ type:"ADD_PAINTING_COMPONENT", payload: this.state })
}


  render() {
    return (
      <div className='paintingComponent'>
        <label htmlFor='method'>
          Tool:
          <input type='text' placeholder='Tool' onChange={(event) => this.handleChange(event, 'tool')}/>
        </label>
        <button onClick={this.addClick}>Add</button>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Method);