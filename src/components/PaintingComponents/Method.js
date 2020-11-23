import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Method extends Component {
  state = {
    method: '',
  }

  handleChange = (event, typeOfKey) => {
    console.log('There was a change!');
    this.setState({
        ...this.state,
        method: event.target.value
    })
    console.log(this.state);
}

// addClick = (event, typeOfKey) => {
//   // this.props.dispatch({ type:"ADD_PAINTING_COMPONENT", payload: this.state });
  
//   console.log('There was a add!');
//     this.props.setState({
//         ...this.props.state,
//         methodList: [...this.state.methodList, this.state.method]
//     })
//     console.log(this.state);
// }


  render() {
    return (
      <div className='paintingComponent'>
        <label htmlFor='method'>
          Method:
          <input type='text' placeholder='Method'  onChange={(event) => this.props.handleChange(event, 'method')}/>
        </label>
        <button value={this.props.method} onClick={(value) => this.props.addClick(value, 'method')}>Add</button>
        <ul>
          {this.props.state.methodList.map((method) => {
            return <li key={method}> {method} </li>
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStoreToProps)(Method);