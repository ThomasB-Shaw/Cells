import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddForm from '../AddForm/AddForm';
import Method from '../PaintingComponents/Method';
import Color from '../PaintingComponents/Color';
import Tool from '../PaintingComponents/Tool';
import EditPainting from'../EditPainting/EditPainting';

class EditPage extends Component {
  state = {
    title: this.props.store.paintingDetails[0],
    description: this.props.store.paintingDetails[0],
    img_url: this.props.store.paintingDetails[0],
    date: this.props.store.paintingDetails[0],
    size_type: this.props.store.paintingDetails[0]
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
        {JSON.stringify(this.state)}
        <EditPainting />
        <AddForm />
        <Method />
        <Color />
        <Tool />
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditPage);