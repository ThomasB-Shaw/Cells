import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class EditMethod extends Component {

    deleteComponent = (id) => {
      console.log('Component ID', id)
      this.props.dispatch({type: 'DELETE_COMPONENT', payload: id});
      this.props.getComponents();
    }

  render() {
    return (
      <div className='methodEditList'>
        <li key={this.props.method.id}>
            {this.props.method.name}
            <button onClick={() => this.deleteComponent(this.props.method.id)}>DELETE</button>
        </li>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(EditMethod);