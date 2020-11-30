import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button} from 'reactstrap';

class Method extends Component {

  render() {
    return (
      <div className='paintingComponent'>
        <label onClick={this.props.secretFillIn} htmlFor='method'>
          Method:
          <br/>
          <input type='text' placeholder='Method' value={this.props.state.method} onChange={(event) => this.props.handleChange(event, 'method')}/>
        </label>
        <br/>
        <Button size='sm' value={this.props.method} className='componentBtn' onClick={(value) => this.props.addClick(value, 'method')}>Add</Button>
        <ul>
          {this.props.state.methodList.map((method) => {
            return <li key={method}> {method} </li>
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Method);