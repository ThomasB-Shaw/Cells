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


const config = {
    bucketName: 'solocells-images',
    dirName: 'photos', /* optional */
    region: 'us-east-2',
    accessKeyId: `${process.env.REACT_APP_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}`,
}

// accessKeyId: `${process.env.ACCESS_KEY_ID}`,
//     secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,

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
    loading: false
  }


  handleChange = (event, typeOfKey) => {
    console.log('There was a change!');
    this.setState({
        ...this.state,
        [typeOfKey]: event.target.value
    })
    console.log(this.state)
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

  // Checks if all values as properly filled in, if so confirms that painting was posted.  Or warns that all data is not filled in.
  submitClick = () => {
    if(this.state.title === '' || this.state.description === '' || this.state.img_url === '' || this.state.date === '' || this.state.size_type === '' || this.state.methodList === [] || this.state.colorList === [] || this.state.toolList === []){
      swal("Warning!", "Please ensure that you have all required fields filled in!", "warning");
    } else {
      this.props.dispatch({ type:"ADD_PAINTING", payload: this.state });
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
    this.props.history.push('/user');
    }
  }

// Checks what kind of add has been clicked then adds it to the proper Array to later be posted
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
      <div className='addPage'>
          <h2>Add A New Painting!</h2>
          <Container className='addForm'>
            <Row>
              <Col>
              <AddForm state={this.state} handleChange={this.handleChange} submitClick={this.submitClick} history={this.props.history} upload={this.upload}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Method  state={this.state} addClick={this.addClick} handleChange={this.handleChange}/>
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
