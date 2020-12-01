import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PaintingGallery from '../PaintingGallery/PaintingGallery';
import './UserPage.css'

class UserPage extends Component {

  // Gets all paintings associated with the users ID #
  componentDidMount = () => {
    this.getMyPaintings();
  }

  // Dispatches to Saga to get all paintings associated with the users ID #
  getMyPaintings = () => {
    this.props.dispatch({type: "FETCH_MY_PAINTINGS"});
  }

  render() {
    return (
      <div className='userGallery'>
        <h1 id="welcome">Hello There, {this.props.store.user.username}!</h1>
        <ul>
        {this.props.store.userAccount.map((painting) => {
                return <>
                  <PaintingGallery painting={painting} history={this.props.history} />
                  </>
              })}
        </ul>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
