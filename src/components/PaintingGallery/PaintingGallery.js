import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class PaintingGallery extends Component {
  // Upon click of movie poster will take user to the details page to display that movies Title, Poster, Description and Genres
  paintingClick = () => {
      this.props.history.push('/details');
      this.props.dispatch({ type: 'FETCH_PAINTING_DETAILS', payload: this.props.painting.id});
  }

  render() {
    return (
      <div className="GalleryPainting">
        <button onClick={this.paintingClick}>
            <img alt={this.props.painting.description} src={this.props.painting.image_url}/>
        </button>
      </div>
    );
  }
}


export default connect(mapStoreToProps)(PaintingGallery);