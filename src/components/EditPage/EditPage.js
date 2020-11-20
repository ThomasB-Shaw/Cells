import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddForm from '../AddForm/AddForm';
import Method from '../PaintingComponents/Method';
import Color from '../PaintingComponents/Color';
import Tool from '../PaintingComponents/Tool';
import swal from 'sweetalert';
import EditPainting from'../EditPainting/EditPainting';

class EditPage extends Component {
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
}

deletePainting = () => {
  // console.log('DELETE ITEM', item);
  swal("Are you sure you want to delete this painting?", "", "warning", {
    buttons: {
      cancel: "Cancel",
      delete: {
        text: "Delete",
        value: "delete",
      },
    },
  })
  .then((value) => {
    switch (value) {
      case "delete":
        swal("Painting Deleted!", "Returning to your account", "success");
          this.props.dispatch({type: 'DELETE_PAINTING', payload: this.props.store.paintingDetails[0].painting_id});
          this.props.history.push('/user');
            break;
      default:
        break;
    }
  });
  }


  render() {
    return (
      <div>
        {/* <EditPainting /> */}
        <AddForm handleChange={this.handleChange} state={this.state}/>
        <Method />
        <Color />
        <Tool />
        {this.props.store.paintingDetails[0] &&
          <button onClick={this.deletePainting}>DELETE Painting</button>
        }
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditPage);