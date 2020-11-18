import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PaintingGallery from '../PaintingGallery/PaintingGallery';

class UserPage extends Component {
  componentDidMount = () => {
    this.getMyPaintings();
  }

  getMyPaintings = () => {
    this.props.dispatch({type: "FETCH_MY_PAINTINGS"});
  }

  render() {
    return (
      <div>
        <h1 id="welcome">Hello There, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <LogOutButton className="log-in" />
        <ul>
        {this.props.store.userAccount.map((painting) => {
                return <li key={painting.id}>
                  <PaintingGallery painting={painting} history={this.props.history} />
                  </li>
              })}
        </ul>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
