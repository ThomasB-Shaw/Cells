import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
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
              {/* {this.props.store.paintings.map((painting) => {
                return <li key={painting.id}>
                  <img alt={painting.description} src={painting.image_url}/>
                  </li>
              })} */}
            </ul>
            {/* <ul>
            {this.props.store.paintings &&
              this.props.store.paintings.map((painting) => {
                return <li key={painting.id}>
                  <img alt={painting.description} src={painting.image_url}/>
                  </li>
              })
             }
            </ul> */}
            <button onClick={this.log}>LOG</button>
            <br/>
            {JSON.stringify(this.props.store.paintings)}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
