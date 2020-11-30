import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Col, Row, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

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
          <Row>
            <Col>
              <FormGroup className='formTitle'>
                <Label onClick={this.props.secretFillIn}className='componentHeader' htmlFor='title'>Title:</Label>
                  <Input type='text' placeholder='Title' id='title' value={this.props.state.title} onChange={(event) => this.props.handleChange(event, 'title')}/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormGroup className='sizeDate'>
              <Label className='componentHeader' htmlFor='date'>Date Made:</Label>
              <Input type='date' id='date' size='small' value={this.props.state.date} onChange={(event) => this.props.handleChange(event, 'date')}/>
            </FormGroup>
            </Col>
            <Col>
          <FormGroup className='sizeDate'>
            <Label className='componentHeader' htmlFor='size_type'>Size:</Label>
            <Input type='select' name='size' id='size_type' size='small' value={this.props.state.size_type} onChange={(event) => this.props.handleChange(event, 'size_type')}>
              <option value=''>Select Size</option>
              <option value='5x5'>5x5</option>
              <option value='5x7'>5x7</option>
              <option value='8x8'>8x8</option>
              <option value='8x10'>8x10</option>
              <option value='10x10'>10x10</option>
              <option value='10x20'>10x20</option>
              <option value='11x24'>11x24</option>
              <option value='12x12'>12x12</option>
              <option value='12x24'>12x24</option>
              <option value='12x36'>12x36</option>
              <option value='15x15'>15x15</option>
              <option value='15x30'>15x30</option>
              <option value='16x16'>16x16</option>
              <option value='16x20'>16x20</option>
              <option value='18x24'>18x24</option>
              <option value='20x20'>20x20</option>
              <option value='22x28'>22x28</option>
              <option value='24x24'>24x24</option>
              <option value='24x30'>24x30</option>
              <option value='24x36'>24x36</option>
              <option value='24x48'>24x48</option>
              <option value='30x30'>30x30</option>
              <option value='30x40'>30x40</option>
              <option value='36x48'>36x48</option>
              <option value='48x48'>48x48</option>
              <option value='48x60'>48x60</option>
            </Input>
          </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <FormGroup className='imageUpload'>
                <Label className='componentHeader' htmlFor='image_url'>Image URL:</Label>
                <Input type='file' placeholder='Image URL' id='image_url'  onChange={this.props.upload}/>
              </FormGroup>
            </Col>
            <Col></Col>
          </Row>
          <div className='spinner'>
          {this.props.state.loading === true ? 
          <Spinner color="primary"/>
          :
            <p></p>
          }
          </div>
          <Row>
            <Col>
              {this.props.state.img_url === '' ?
              <img  src='https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png' alt='PlaceHolder'/>
              :
              <img src={this.props.state.img_url} alt={this.props.state.title} />
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup className='formLine'>
                <Label className='componentHeader' htmlFor='description'>Description:</Label>
                <Input type='textarea' placeholder='Description' id='description' value={this.props.state.description} onChange={(event) => this.props.handleChange(event, 'description')}/>
              </FormGroup >
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddForm);