import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddForm from '../AddForm/AddForm';
import Method from '../PaintingComponents/Method';
import Color from '../PaintingComponents/Color';
import Tool from '../PaintingComponents/Tool';
import './AddPage.css';

class AddPage extends Component {
  state = {
    title: '',
    description: '',
    img_url: '',
    date: '',
    size_type: '',
    methodList: [],
    colorList: [],
    toolList: [],
    method: '',
    color: '',
    tool: ''
  }

  handleChange = (event, typeOfKey) => {
    console.log('There was a change!');
    this.setState({
        ...this.state,
        [typeOfKey]: event.target.value
    })
    console.log(this.state)
}

submitClick = () => {
  this.props.dispatch({ type:"ADD_PAINTING", payload: this.state })
  // this.props.history.push('/edit');
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

log = () => {
  console.log(this.state);
}

  render() {
    return (
      <div>
        <AddForm handleChange={this.handleChange} state={this.state}/>
        <button onClick={this.log}>LOG STATE</button>
        <Method addClick={this.addClick} handleChange={this.handleChange}/>
        <Color addClick={this.addClick}/>
        <Tool addClick={this.addClick}/>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddPage);
