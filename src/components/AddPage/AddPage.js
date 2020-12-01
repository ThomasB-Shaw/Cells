import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddForm from '../AddForm/AddForm';
import Method from '../PaintingComponents/Method';
import Color from '../PaintingComponents/Color';
import Tool from '../PaintingComponents/Tool';
import {Col, Row, Button, Container } from 'reactstrap';
import './AddPage.css';
import swal from 'sweetalert';
import ReactS3 from 'react-s3';

// Config set to allow use of AWS S3 with ReactS3
const config = {
    bucketName: 'solocells-images',
    dirName: 'photos', /* optional */
    region: 'us-east-2',
    accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}`,
}

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
    tool: '',
    loading: false,
    counter:0
  }

  // Activated on change from add form or painting component, holds state and changes based on key passed
  handleChange = (event, typeOfKey) => {
    console.log('There was a change!');
    this.setState({
        ...this.state,
        [typeOfKey]: event.target.value
    })
    console.log(this.state)
  }

  // upload feature from ReactS3 on successful response sets the public url to the state to be stored
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

  // Checks if all values as properly filled in, if so confirms that painting was posted.  Or warns that all data is not filled in.
  submitClick = () => {
    if(this.state.title === '' || this.state.description === '' || this.state.img_url === '' || this.state.date === '' || this.state.size_type === '' || this.state.methodList === [] || this.state.colorList === [] || this.state.toolList === []){
      swal("Warning!", "Please ensure that you have all required fields filled in!", "warning");
    } else {
      this.props.dispatch({ type:"ADD_PAINTING", payload: this.state, history: this.props.history });
      swal("Success!", "Painting was added, Returning to your page", "success");
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

// Checks what kind of add has been clicked then adds it to the proper Array to later be posted
addClick = (event, typeOfKey) => {
  if(typeOfKey === 'method'){
    if(this.state.method === '') {
      swal("No Method Input", "Please fill out the method input field and try again", "warning");
    } else {
      console.log('There was a add!', typeOfKey);
      this.setState({
        ...this.state,
        methodList: [...this.state.methodList, this.state.method],
        method: ''
      })
    }
  } else if (typeOfKey === 'color') {
    if(this.state.brand === '' || this.state.color === '') {
      swal("Proper Input Not Detected", "Please fill out the brand and the color input field and try again", "warning");
    } else {
      console.log('There was a add!', typeOfKey);
      this.setState({
        ...this.state,
        colorList: [...this.state.colorList, [this.state.brand, this.state.color]],
        brand: '',
        color: ''
      })
      }
  } else if (typeOfKey === 'tool') {
    if(this.state.tool === '') {
      swal("No Tool Input", "Please fill out the tool input field and try again", "warning");
    } else {
      console.log('There was a add!', typeOfKey);
      this.setState({
        ...this.state,
        toolList: [...this.state.toolList, this.state.tool],
        tool: ''
      })
    }
  } else { 
    console.log('Error type of update unknown')
    }
  console.log(this.state);
}

// Fill in for presentation
secretFillIn = () => {
  if(this.state.counter === 0){
    this.setState({
      ...this.state,
      title: 'Steel Ball Run',
      description: 'A collaboration between me and my older brother, way low on paint and it shows on the edges!',
      size_type: '48x60',
      methodList: [],
      colorList: [],
      toolList: [],
      method: 'Dirty Pour',
      color: 'Pearl',
      brand: 'Golden Md',
      tool: 'Pallet Knife',
      counter: 1
    })
  } else if (this.state.counter === 1){
    this.setState({
      ...this.state,
      method: 'Puddle Pour',
      color: 'Ivory Black',
      brand: 'Golden Hf',
      counter: 2
    })
  } else if (this.state.counter === 2){
    this.setState({
      ...this.state,
      color: 'Iridescent Gold',
      brand: 'Golden Hf',
      counter: 3
    })
  } else if (this.state.counter === 3){
    this.setState({
      ...this.state,
      color: 'Oxide Purple',
      brand: 'Golden Md',
      counter: 4
    })
  }
}

  render() {
    return (
      <div className='addPage'>
          <h2>Add A New Painting!</h2>
          <Container className='addForm'>
            <Row>
              <Col>
              <AddForm secretFillIn= {this.secretFillIn} state={this.state} handleChange={this.handleChange} submitClick={this.submitClick} history={this.props.history} upload={this.upload}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Method secretFillIn={this.secretFillIn} state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
              </Col>
              <Col>
                <Color state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
              </Col>
              <Col>
                <Tool state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
              </Col>
            </Row>
            <Button className='addNewPainting' color="success" onClick={this.submitClick}>SUBMIT</Button>
          </Container>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddPage);
