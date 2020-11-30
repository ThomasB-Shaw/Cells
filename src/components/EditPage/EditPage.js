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
import './EditPage.css';
import {Col, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import swal from 'sweetalert';
import ReactS3 from 'react-s3';

const config = {
  bucketName: 'solocells-images',
  dirName: 'photos', /* optional */
  region: 'us-east-2',
  accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}`,
}

class EditPage extends Component {
  state = {
    title: this.props.store.paintingDetails[0].title,
    description: this.props.store.paintingDetails[0].description,
    img_url: this.props.store.paintingDetails[0].image_url,
    date: this.props.store.paintingDetails[0].date,
    size_type: this.props.store.paintingDetails[0].size_type,
    methodList: [],
    colorList: [],
    toolList: [],
    method: '',
    color: '',
    brand: '',
    tool: '',
    loading: false
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
    console.log(this.state);
  }

  updatePainting = () => {
    if(this.state.title === '' || this.state.description === '' || this.state.img_url === '' || this.state.date === '' || this.state.size_type === '' || this.state.methodList === [] || this.state.colorList === [] || this.state.toolList === []){
      swal("Warning!", "Please ensure that you have all required fields filled in!", "warning");
    } else {
      this.props.dispatch({ type:"EDIT_PAINTING", payload: this.state, id: this.props.store.paintingDetails[0].painting_id, history: this.props.history });
      swal("Success!", "Painting was updated, Returning to your page", "success");
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
        tool: '',
        loading: false
      })
    }
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
      if(this.state.method === '') {
        swal("No Method Input", "Please fill out the method input field and try again", "warning");
      } else {
        console.log('There was a add!', typeOfKey);
        this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.props.store.paintingDetails[0].painting_id ,'method', this.state.method], getComponents: this.getComponents});
        this.setState({
          ...this.state,
          method: ''
        })
      }
    } else if (typeOfKey === 'color') {
      if(this.state.brand === '' || this.state.color === '') {
        swal("Proper Input Not Detected", "Please fill out the brand and the color input field and try again", "warning");
      } else{
        console.log('There was a add!', typeOfKey);
        this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.props.store.paintingDetails[0].painting_id ,'color', this.state.brand, this.state.color], getComponents: this.getComponents});
        this.setState({
          ...this.state,
          brand: '',
          color: ''
        })
      }
    } else if (typeOfKey === 'tool') {
        if(this.state.tool === '') {
          swal("No Tool Input", "Please fill out the tool input field and try again", "warning");
        } else {
        console.log('There was a add!', typeOfKey);
        this.props.dispatch({type: 'ADD_COMPONENT', payload: [this.props.store.paintingDetails[0].painting_id , 'tool' , this.state.tool], getComponents: this.getComponents});
        this.setState({
          ...this.state,
          tool: ''
        })
      }
    } else { 
      console.log('Error type of component unknown')
    }
  }

  upload = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      ...this.state,
      loading: true
    })
    ReactS3.uploadFile( e.target.files[0], config)
    .then((data) => {
      console.log(data);
      console.log(data.location)
      this.setState({
        ...this.state,
        img_url: data.location,
        loading: false
      });
    }).catch((err) => {
      console.log('Error in upload', err);
      alert(err);
    })
  }

  render() {
    return (
      <div className='editPage'>
        <Container className='addForm'>
          <h2>Edit Painting!</h2>
          <AddForm handleChange={this.handleChange} state={this.state}/>
          <Row>
            <Col className='addComponent' >
              <Method state={this.state} handleChange={this.handleChange} history={this.props.history} upload={this.upload} addClick={this.addClick} />
              <ul>
                {this.props.store.componentDetails.methodsReducer.map((method) => {
                  return < EditMethod state={this.state} method={method} getComponents={this.getComponents}/>
                })}
              </ul>
            </Col>
            <Col className='addComponent'>
              <Color state={this.state} addClick={this.addClick} handleChange={this.handleChange} />
              <ul>
                {this.props.store.componentDetails.colorsReducer.map((color) => {
                  return < EditColor state={this.state} color={color} getComponents={this.getComponents}/>
                })}
              </ul>
            </Col>
            <Col className='addComponent'>
              <Tool state={this.state} addClick={this.addClick} handleChange={this.handleChange} />
              <ul>
                {this.props.store.componentDetails.toolsReducer.map((tool) => {
                  return < EditTool state={this.state} tool={tool} getComponents={this.getComponents}/>
                })}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
          {this.props.store.paintingDetails[0] &&
            <Button color='danger' onClick={this.deletePainting}>DELETE Painting</Button>
          }
          </Col>
          <Col></Col>
          <Col>
          {this.props.store.paintingDetails[0] &&
            <Button color='success' onClick={this.updatePainting}>SAVE CHANGES</Button>
          }
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditPage);