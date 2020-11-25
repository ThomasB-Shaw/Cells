import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class EditMethod extends Component {

  deleteComponent = (id) => {
    console.log('Component ID', id)
    this.props.dispatch({type: 'DELETE_COMPONENT', payload: id});
  }

  render() {
    return (
      <div className='colorEditList'>
        <li key={this.props.color.id}>{this.props.color.brand}: {this.props.color.name}</li>
        <button onClick={() => this.props.deleteComponent(this.props.color.id)}>DELETE</button>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditMethod);