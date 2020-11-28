import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button} from 'reactstrap';

class Method extends Component {
  state = {
    tool: '',
  }

  handleChange = (event, typeOfKey) => {
    console.log('There was a change!');
    this.setState({
        ...this.state,
        [typeOfKey]: event.target.value
    })
    console.log(this.state);
}

addClick = () => {
  this.props.dispatch({ type:"ADD_PAINTING_COMPONENT", payload: this.state })
}


  render() {
    return (
      <div className='paintingComponent'>
        <label htmlFor='method'>
          Tool:
          <input type='text' placeholder='Tool' onChange={(event) => this.props.handleChange(event, 'tool')}/>
        </label>
        <Button size='sm' value={this.props.tool} onClick={(value) => this.props.addClick(value, 'tool')}>Add</Button>
        <ul>
          {this.props.state.toolList.map((tool) => {
            return <li key={tool}> {tool} </li>
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Method);