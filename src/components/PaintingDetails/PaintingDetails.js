import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router'

class PaintingDetails extends Component {
  // Returns user to Gallery Home Page on click of Return to Gallery button
  returnHome = () => {
      this.props.history.push('/home');
  }

  render() {
    return (
      <div className="PaintingDetails">
        {this.props.store.thatPainting[0] &&
        <h2 className='titleDetail'>{this.props.store.thatPainting[0].title}</h2>
        }
        {this.props.store.thatPainting[0] &&
        <img id='imgDetail' src={this.props.store.thatPainting[0].image_url} alt={this.props.store.thatPainting[0].title}/>
        }
        {this.props.store.thatPainting[0] &&
        <p id='descriptionDetail'>{this.props.store.thatPainting[0].description}</p>
        }
        {/* <h3 id='genreDetail'>Genres</h3>
        <ul id='listGenreDetail'>
        {this.props.store.thatPainting.map((info) => {
            return <li key={info.name}>{info.name}</li>
        })}
        </ul> */}
        <button id='returnDetail' onClick={this.returnToHome}>Return to Home</button>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(PaintingDetails));