import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button} from 'reactstrap';

class Color extends Component {
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

addClick = () => {
  this.props.dispatch({ type:"ADD_PAINTING_COMPONENT", payload: this.state })
}


  render() {
    return (
      <div className='paintingComponent'>
        <label htmlFor='color'>
          Brand:
          <br/>
          <input type='text' placeholder='Brand' onChange={(event) => this.props.handleChange(event, 'brand')}/>
          <br/>
          Color:
          <br/>
          <input type='text' placeholder='Color' onChange={(event) => this.props.handleChange(event, 'color')}/>
        </label>
        <br/>
        <Button size='sm' value={this.props.tool} id='componentBtn' onClick={(value) => this.props.addClick(value, 'color')}>Add</Button>
        <ul>
          {this.props.state.colorList.map((color) => {
            return <li key={color[1]}> Brand: {color[0]} Color: {color[1]} </li>
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Color);