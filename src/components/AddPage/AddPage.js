import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddForm from '../AddForm/AddForm';
import Method from '../PaintingComponents/Method';
import Color from '../PaintingComponents/Color';
import Tool from '../PaintingComponents/Tool';
import './AddPage.css';
import swal from 'sweetalert';

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

// Checks if all values as properly filled in, if so confirms that painting was posted.  Or warns that all data is not filled in.
submitClick = () => {
  if(this.state.title === '' || this.state.description === '' || this.state.img_url === '' || this.state.date === '' || this.state.size_type === '' || this.state.methodList === [] || this.state.colorList === [] || this.state.toolList === []){
    swal("Warning!", "Please ensure that you have all required fields filled in!", "warning");
  } else {
    this.props.dispatch({ type:"ADD_PAINTING", payload: this.state });
    swal("Success!", "Painting was added, Returning to your page", "Success");
    this.setState ({
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
    })
    // this.props.history.push('/user');
  }
}

addClick = (event, typeOfKey) => {

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

  render() {
    return (
      <div>
        <AddForm state={this.state} handleChange={this.handleChange} submitClick={this.submitClick} history={this.props.history}/>
        <Method  state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
        <Color state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
        <Tool state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddPage);
