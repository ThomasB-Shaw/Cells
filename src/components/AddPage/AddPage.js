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
    size_type: ''
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


  render() {
    return (
      <div>
        <AddForm />
        <Method />
        <Color />
        <Tool />
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddPage);
