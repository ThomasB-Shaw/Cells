import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button} from 'reactstrap';

class EditColor extends Component {

  // uses private state to dispatch a delete request to the saga deleting specific component by id, then retrieving all components with a get request 
  deleteComponent = (id) => {
    console.log('Component ID', id)
    this.props.dispatch({type: 'DELETE_COMPONENT', payload: id, getComponents: this.props.getComponents});
  }

  render() {
    return (
      <div className='colorEditList'>
        <li key={this.props.color.component_id}>
          {this.props.color.brand}: {this.props.color.name}  
          { !this.props.state.view ?
            <Button color="danger" size="sm" onClick={() => this.deleteComponent(this.props.color.component_id)}>DELETE</Button>
            :
            <p></p>
            }
        </li>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditColor);