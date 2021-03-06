import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './PaintingGallery.css';

class PaintingGallery extends Component {
  // Upon click of movie poster will take user to the details page to display that movies Title, Poster, Description and Genres
  paintingClick = () => {
      this.props.dispatch({ type: 'FETCH_PAINTING_DETAILS', payload: this.props.painting.id , history: this.props.history});
  }

  render() {
    return (
      <div className="GalleryPainting">
        <button className='imageBtn' onClick={this.paintingClick}>
            <img className='galleryImage' alt={this.props.painting.description} src={this.props.painting.image_url}/>
        </button>
      </div>
    );
  }
}


export default connect(mapStoreToProps)(PaintingGallery);