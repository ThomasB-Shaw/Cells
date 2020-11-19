import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';
import './PaintingDetails.css'

class PaintingDetails extends Component {
  // Returns user to Gallery Home Page on click of Return to Gallery button
  state = {
    method: [],
    color: [],
    tool: []
  }

  componentDidMount = () => {
    this.setState({
      method: [],
      color: [],
      tool: []
    })
    this.getComponentType(this.props.store.paintingDetails);
  }

  returnToHome = () => {
      this.props.history.push('/home');
  }

  log = () => {
    console.log(this.state);
    console.log(this.props.store.paintingDetails);
  }

  run = () => {
    this.getComponentType(this.props.store.paintingDetails);
  }


  getComponentType = (storeArray) => {
    let tempMethod = [];
    let tempColor = [];
    let tempTool = [];
    for (let i = 0; i < storeArray.length; i++) {
      if(storeArray[i].type === 'method'){
        console.log(storeArray[i]);
        console.log(this.state.method);
        tempMethod.push(storeArray[i]);
        // this.setState({
        //   method: [...this.state.method, storeArray[i].name]
        // });
      } else if(storeArray[i].type === 'color'){
        tempColor.push(storeArray[i]);
        // this.setState({
        //   color: [...this.state.color, storeArray[i].name]
        // });
      }else if (storeArray[i].type === 'tool'){
        tempTool.push(storeArray[i]);
        // this.setState({
        //   tool: [...this.state.tool, storeArray[i].name]
        // });
      } else {console.log('not working yet der boss!')}
    }
    console.log('temp',tempMethod);
    this.setState({
      method: tempMethod,
    color: tempColor,
    tool: tempTool
    })
  }

  render() {
    return (
      <div className="PaintingDetails">
        <div className='topDetails'>
        {this.props.store.paintingDetails[0] &&
        <h2 className='titleDetail'>{this.props.store.paintingDetails[0].title}</h2>
        }
        {this.props.store.paintingDetails[0] &&
        <h4 className='dateDetail'>{this.props.store.paintingDetails[0].date}</h4>
        }
        {this.props.store.paintingDetails[0] &&
        <h4 className='userDetail'>{this.props.store.paintingDetails[0].size_type}</h4>
        }
        </div>
        {this.props.store.paintingDetails[0] &&
        <img id='imgDetail' src={this.props.store.paintingDetails[0].image_url} alt={this.props.store.paintingDetails[0].title}/>
        }
        {this.props.store.paintingDetails[0] &&
        <p id='descriptionDetail'>{this.props.store.paintingDetails[0].description}</p>
        }
        <h3 id='componentsDetail'>Components</h3>
        <ul id='listComponentsDetails'>
        {this.props.store.paintingDetails.map((component) => {
          return <li key={component.id}>{component.brand} {component.name}</li>
        })}
        </ul>
        <button id='returnDetail' onClick={this.returnToHome}>Return to Home</button>
        <button onClick={this.log}>LOG</button>
        <button onClick={this.run}>RUN</button>
      </div>
    );
  }
}

// return <li key={component.id}>{component.brand} {component.name}</li>

export default withRouter(connect(mapStoreToProps)(PaintingDetails));