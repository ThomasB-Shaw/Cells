import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button} from 'reactstrap';

class EditColor extends Component {

  deleteComponent = (id) => {
    console.log('Component ID', id)
    this.props.dispatch({type: 'DELETE_COMPONENT', payload: id, getComponents: this.props.getComponents});
    this.props.getComponents();
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