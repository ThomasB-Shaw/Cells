import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class EditColor extends Component {

  deleteComponent = (id) => {
    console.log('Component ID', id)
    this.props.dispatch({type: 'DELETE_COMPONENT', payload: id});
    this.props.getComponents();
  }

  render() {
    return (
      <div className='colorEditList'>
        <li key={this.props.color.component_id}>{this.props.color.brand}: {this.props.color.name}</li>
        <button onClick={() => this.deleteComponent(this.props.color.component_id)}>DELETE</button>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditColor);