import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EditMethod extends Component {

    deleteComponent = (id) => {
      console.log('Component ID', id)
      this.props.dispatch({type: 'DELETE_COMPONENT', payload: id});
    }

  render() {
    return (
      <div className='methodEditList'>
        <li key={this.props.method.id}>
            {this.props.method.name}
            { !this.props.state.view ?
              <Button color ="danger" size="sm" onClick={() => this.deleteComponent(this.props.method.component_id)}>DELETE</Button>
              :
              <p></p>
              }
        </li>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditMethod);