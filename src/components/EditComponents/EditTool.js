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
            { !this.props.state.view ?
          <button onClick={() => this.deleteComponent(this.props.color.component_id)}>DELETE</button>
          :
          <p></p>
          }
        </li>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditTool);