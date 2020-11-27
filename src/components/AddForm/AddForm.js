import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddForm extends Component {
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

  render() {
    return (
      <div className='addForm'>
        <Form>
          <Row Form>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor='title'>Title:</Label>
                  <Input type='text' placeholder='title' id='title' value={this.props.state.title} onChange={(event) => this.props.handleChange(event, 'title')}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor='image_url'>Image URL:</Label>
                  <Input type='text' placeholder='Image URL' id='image_url' value={this.props.state.img_url}  onChange={(event) => this.props.handleChange(event, 'img_url')}/>
              </FormGroup>
            </Col>
          </Row>
          {this.props.state.img_url === '' ?
          <img  src='https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png' alt='PlaceHolder'/>
          :
          <img src={this.props.state.img_url} alt={this.props.state.title} />
          }
          <FormGroup>
          <Label htmlFor='description'>Description:</Label>
            <Input type='textarea' placeholder='Description' id='description' value={this.props.state.description} onChange={(event) => this.props.handleChange(event, 'description')}/>
          </FormGroup>
          <Label htmlFor='date'>Date Made</Label>
            <Input type='date' id='date' value={this.props.state.date} onChange={(event) => this.props.handleChange(event, 'date')}/>
          <FormGroup>
            <Label htmlFor='size_type'>Size:</Label>
              <Input type='select' name='size' id='size_type' value={this.props.state.size_type} onChange={(event) => this.props.handleChange(event, 'size_type')}>
              <option value=''></option>
              <option value='5x5'>5x5</option>
              <option value='8x10'>8x10</option>
              <option value='10x20'>10x20</option>
              <option value='12x24'>12x24</option>
              <option value='15x15'>15x15</option>
              <option value='15x30'>15x30</option>
              <option value='36x48'>36x48</option>
              <option value='48x60'>48x60</option>
              </Input>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddForm);