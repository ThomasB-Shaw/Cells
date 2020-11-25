import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

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
            <button onClick={() => this.deleteComponent(this.props.tool.component_id)}>DELETE</button>
        </li>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditTool);