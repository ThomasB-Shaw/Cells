import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './AddPage.css'

class AddPage extends React.Component {
  state = {
    title: '',
    description: '',
    img_url: '',
    date: '',
    size_type: ''
    // method: '',
    // colorBrand: '',
    // color: '',
    // tool: ''
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
        <h1>Add New Painting!</h1>
        <label htmlFor='title'>
          Title:
          <input type='text' placeholder='title' onChange={(event) => this.handleChange(event, 'title')}/>
        </label>
        <label htmlFor='description'>
          Description:
          <input type='text' placeholder='Description' onChange={(event) => this.handleChange(event, 'description')}/>
        </label>
        <label htmlFor='image_url'>
          Image URL:
          <input type='text' placeholder='Image URL' onChange={(event) => this.handleChange(event, 'img_url')}/>
        </label>
        <label htmlFor='date'>
          Date:
          <input type='date' onChange={(event) => this.handleChange(event, 'date')}/>
        </label>
        <form>
          <label htmlFor='image_url'>
            Size:
            <select name='size' id='size' onChange={(event) => this.handleChange(event, 'size_type')}>
            <option value=''></option>
              <option value='5x5'>5x5</option>
              <option value='8x10'>8x10</option>
              <option value='10x20'>10x20</option>
              <option value='12x24'>12x24</option>
              <option value='15x15'>15x15</option>
              <option value='15x30'>15x30</option>
              <option value='36x48'>36x48</option>
              <option value='48x60'>48x60</option>
            </select>
          </label>
        </form>
        <button onClick={this.submitClick}>SUBMIT</button>
        <br/>
        <img src={this.state.img_url} alt={this.state.title}/>
        <br/>
        {/* <label htmlFor='method'>
          Method:
          <input type='text' placeholder='Method' onChange={(event) => this.handleChange(event, 'method')}/>
          <br/>
          Brand:
          <input type='text' placeholder='Brand' onChange={(event) => this.handleChange(event, 'colorBrand')}/>
          Color:
          <input type='text' placeholder='Color' onChange={(event) => this.handleChange(event, 'color')}/>
          <br/>
          Tool:
          <input type='text' placeholder='Method' onChange={(event) => this.handleChange(event, 'tool')}/>
        </label> */}
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddPage);
