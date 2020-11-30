import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button} from 'reactstrap';

class EditTool extends Component {

    deleteComponent = (id) => {
      console.log('Component ID', id)
      this.props.dispatch({type: 'DELETE_COMPONENT', payload: id, getComponents: this.props.getComponents});
    }

  render() {
    return (
      <div className='toolEditList'>
        <li key={this.props.tool.component_id}>
            {this.props.tool.name}
            { !this.props.state.view ?
              <Button color="danger" size="sm" onClick={() => this.deleteComponent(this.props.tool.component_id)}>DELETE</Button>
              :
              <p></p>
              }
        </li>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditTool);