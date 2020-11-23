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
    brand: '',
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
  if(typeOfKey === 'method'){
  console.log('There was a add!', typeOfKey);
    this.setState({
        ...this.state,
        methodList: [...this.state.methodList, this.state.method]
    })} else if (typeOfKey === 'color') {
      console.log('There was a add!', typeOfKey);
        this.setState({
            ...this.state,
            colorList: [...this.state.colorList, [this.state.brand, this.state.color]]
        })} else if (typeOfKey === 'tool') {
          console.log('There was a add!', typeOfKey);
            this.setState({
                ...this.state,
                toolList: [...this.state.toolList, this.state.tool]
            })} else { 
              console.log('Error type of update unknown')
            }
    console.log(this.state);
}

log = () => {
  console.log(this.state);
}

  render() {
    return (
      <div>
        {JSON.stringify(this.state.colorList)}
        <AddForm state={this.state} handleChange={this.handleChange}/>
        <button onClick={this.log}>LOG STATE</button>
        <Method  state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
        <Color state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
        <Tool state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddPage);
