import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PaintingGallery from '../PaintingGallery/PaintingGallery';
import './LandingPage.css';

// CUSTOM COMPONENTS


class LandingPage extends Component {
  state = {
    heading: 'Home Gallery!',
  };

  componentDidMount = () => {
    this.getPaintings();
  }

  getPaintings = () => {
    this.props.dispatch({type: 'FETCH_PAINTINGS'});
    console.log(this.props.store.paintings);
  }

  log = () => {
    console.log(this.props.store.paintings)
  }

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>
            <ul>
              {this.props.store.paintings.map((painting) => {
                return <li key={painting.id}>
                  <PaintingGallery painting={painting} history={this.props.history}/>
                  </li>
              })}
            </ul>
            <button onClick={this.log}>LOG</button>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(LandingPage));
