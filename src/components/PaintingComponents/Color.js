import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button} from 'reactstrap';

class Color extends Component {
  render() {
    return (
      <div className='paintingComponent'>
        <label htmlFor='color'>
          Brand:
          <br/>
          <input type='text' placeholder='Brand' value={this.props.state.brand} onChange={(event) => this.props.handleChange(event, 'brand')}/>
          <br/>
          Color:
          <br/>
          <input type='text' placeholder='Color' value={this.props.state.color} onChange={(event) => this.props.handleChange(event, 'color')}/>
        </label>
        <br/>
        <Button size='sm' className='componentBtn' value={this.props.color} onClick={(value) => this.props.addClick(value, 'color')}>Add</Button>
        <ul>
          {this.props.state.colorList.map((color) => {
            return <li key={color[1]}>{color[0]} : {color[1]} </li>
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Color);