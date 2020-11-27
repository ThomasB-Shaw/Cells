import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EditTool extends Component {

    deleteComponent = (id) => {
      console.log('Component ID', id)
      this.props.dispatch({type: 'DELETE_COMPONENT', payload: id});
      this.props.getComponents();
    }

  render() {
    return (
      <div className='toolEditList'>
        <li key={this.props.tool.component_id}>
            {this.props.tool.name}
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

export default connect(mapStoreToProps)(EditTool);