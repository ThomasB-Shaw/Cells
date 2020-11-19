import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';
import './PaintingDetails.css'

class PaintingDetails extends Component {
  // Returns user to Gallery Home Page on click of Return to Gallery button
  returnToHome = () => {
      this.props.history.push('/home');
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
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(PaintingDetails));