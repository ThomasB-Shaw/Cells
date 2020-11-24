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
    size_type: '',
    methodList: [],
    colorList: [],
    toolList: [],
    method: '',
    color: '',
    brand: '',
    tool: ''
  }

  // componentDidMount = () => {
  //   this.setState({
  //   title: this.props.store.paintingDetails[0].title,
  //   description: '',
  //   img_url: '',
  //   date: '',
  //   size_type: '',
  //   methodList: [],
  //   colorList: [],
  //   toolList: [],
  //   method: '',
  //   color: '',
  //   brand: '',
  //   tool: ''
  //   })
  // }

  handleChange = (event, typeOfKey) => {
    console.log('There was a change!');
    this.setState({
        ...this.state,
        [typeOfKey]: event.target.value
    })
    console.log(this.state)
}

updatePainting = () => {
  this.props.dispatch({ type:"EDIT_PAINTING", payload: this.state, id: this.props.store.paintingDetails[0].painting_id })
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

  addClick = (event, typeOfKey) => {
    if(typeOfKey === 'method'){
    console.log('There was a add!', typeOfKey);
    this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.state.method, 'method'], id:this.props.store.paintingDetails[0].painting_id});
      } else if (typeOfKey === 'color') {
        console.log('There was a add!', typeOfKey);
        this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.state.brand, this.state.color, 'color'], id:this.props.store.paintingDetails[0].painting_id});
      } else if (typeOfKey === 'tool') {
        console.log('There was a add!', typeOfKey);
        this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.state.method, 'tool'], id:this.props.store.paintingDetails[0].painting_id});
      } else { 
        console.log('Error type of component unknown')
      }
  }


  render() {
    return (
      <div>
        {/* <EditPainting /> */}
        <AddForm handleChange={this.handleChange} state={this.state}/>
        <Method state={this.state} addClick={this.addClick} handleChange={this.handleChange} />
        <Color state={this.state} addClick={this.addClick} handleChange={this.handleChange} />
        <Tool state={this.state} addClick={this.addClick} handleChange={this.handleChange} />
        {this.props.store.paintingDetails[0] &&
          <button onClick={this.deletePainting}>DELETE Painting</button>
        }
        {this.props.store.paintingDetails[0] &&
          <button onClick={this.updatePainting}>SAVE CHANGES</button>
        }
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditPage);