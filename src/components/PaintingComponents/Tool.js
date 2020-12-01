import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button} from 'reactstrap';

class Method extends Component {
  render() {
    return (
      <div className='paintingComponent'>
        <label htmlFor='method'>
          Tool:
          <br/>
          <input type='text' placeholder='Tool' value={this.props.state.tool} onChange={(event) => this.props.handleChange(event, 'tool')}/>
        </label>
        <br/>
        <Button size='sm' value={this.props.tool} className='componentBtn' onClick={(value) => this.props.addClick(value, 'tool')}>Add</Button>
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