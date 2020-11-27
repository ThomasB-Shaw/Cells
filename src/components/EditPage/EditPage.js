import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddForm from '../AddForm/AddForm';
import Method from '../PaintingComponents/Method';
import Color from '../PaintingComponents/Color';
import Tool from '../PaintingComponents/Tool';
import EditMethod from '../EditComponents/EditMethod';
import EditColor from '../EditComponents/EditColor';
import EditTool from '../EditComponents/EditTool';
import {Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import swal from 'sweetalert';

class EditPage extends Component {
  state = {
    title: this.props.store.paintingDetails[0].title,
    description: this.props.store.paintingDetails[0].description,
    img_url: this.props.store.paintingDetails[0].img_url,
    date: this.props.store.paintingDetails[0].date,
    size_type: this.props.store.paintingDetails[0].size_type,
    methodList: [],
    colorList: [],
    toolList: [],
    method: '',
    color: '',
    brand: '',
    tool: ''
  }

  componentDidMount = () => {
    this.getComponents();
  }

  getComponents = () => {
    this.props.dispatch({type: 'FETCH_METHODS', id: this.props.store.paintingDetails[0].painting_id});
    this.props.dispatch({type: 'FETCH_COLORS', id: this.props.store.paintingDetails[0].painting_id});
    this.props.dispatch({type: 'FETCH_TOOLS', id: this.props.store.paintingDetails[0].painting_id});
  }

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
      this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.props.store.paintingDetails[0].painting_id ,'method', this.state.method]});
      this.props.dispatch({type: 'FETCH_METHODS', id: this.props.store.paintingDetails[0].painting_id});
      this.getComponents();
    } else if (typeOfKey === 'color') {
      console.log('There was a add!', typeOfKey);
      this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.props.store.paintingDetails[0].painting_id ,'color', this.state.brand, this.state.color]});
      this.props.dispatch({type: 'FETCH_COLORS', id: this.props.store.paintingDetails[0].painting_id});
    } else if (typeOfKey === 'tool') {
      console.log('There was a add!', typeOfKey);
      this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.props.store.paintingDetails[0].painting_id , 'tool' , this.state.tool]});
      this.props.dispatch({type: 'FETCH_TOOLS', id: this.props.store.paintingDetails[0].painting_id});
    } else { 
      console.log('Error type of component unknown')
    }
    this.getComponents(); // Not sure why but needs to be dispatch x3 to work dynamically
  }

  render() {
    return (
      <div className='editPage'>
        <h2>Edit Painting!</h2>
        <AddForm handleChange={this.handleChange} state={this.state}/>
        <Method state={this.state} addClick={this.addClick} handleChange={this.handleChange} />
        <ul>
        {this.props.store.componentDetails.methodsReducer.map((method) => {
          return < EditMethod state={this.state} method={method} getComponents={this.getComponents}/>
        })}
        </ul>
        <Color state={this.state} addClick={this.addClick} handleChange={this.handleChange} />
        <ul>
        {this.props.store.componentDetails.colorsReducer.map((color) => {
          return < EditColor state={this.state} color={color} getComponents={this.getComponents}/>
        })}
        </ul>
        <Tool state={this.state} addClick={this.addClick} handleChange={this.handleChange} />
        <ul>
        {this.props.store.componentDetails.toolsReducer.map((tool) => {
          return < EditTool state={this.state} tool={tool} getComponents={this.getComponents}/>
        })}
        </ul>
        {this.props.store.paintingDetails[0] &&
          <button onClick={this.deletePainting}>DELETE Painting</button>
        }
        {this.props.store.paintingDetails[0] &&
          <Button onClick={this.updatePainting}>SAVE CHANGES</Button>
        }
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditPage);