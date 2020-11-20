import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

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

submitClick = () => {
  this.props.dispatch({ type:"ADD_PAINTING", payload: this.props.state })
  // this.props.history.push('/edit');
}


  render() {
    return (
      <div>
        <h1>Add New Painting!</h1>
        <label htmlFor='title'>
          Title:
          <input type='text' placeholder='title' onChange={(event) => this.props.handleChange(event, 'title')}/>
        </label>
        <label htmlFor='description'>
          Description:
          <input type='text' placeholder='Description' onChange={(event) => this.props.handleChange(event, 'description')}/>
        </label>
        <label htmlFor='image_url'>
          Image URL:
          <input type='text' placeholder='Image URL' onChange={(event) => this.props.handleChange(event, 'img_url')}/>
        </label>
        <br/>
        <img src={this.props.state.img_url} alt={this.props.state.title}/>
        <br/>
        <label htmlFor='date'>
          Date:
          <input type='date' onChange={(event) => this.props.handleChange(event, 'date')}/>
        </label>
        <form>
          <label htmlFor='size_type'>
            Size:
            <select name='size' id='size' onChange={(event) => this.props.handleChange(event, 'size_type')}>
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
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AddForm);