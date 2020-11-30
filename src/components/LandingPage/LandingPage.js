import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PaintingGallery from '../PaintingGallery/PaintingGallery';
import {Jumbotron, Container} from 'reactstrap';
import './LandingPage.css';

// CUSTOM COMPONENTS

class LandingPage extends Component {
  state = {
    heading: 'Home Gallery!',
  };

  // Fetches 9 Random Paintings to populate Home page, on refresh or load
  componentDidMount = () => {
    this.getPaintings();
  }

  // Dispatch Request to PaintingSaga
  getPaintings = () => {
    this.props.dispatch({type: 'FETCH_PAINTINGS'});
    console.log(this.props.store.paintings);
  }

  render() {
    return (
      <>
        <Jumbotron className="homeJumbotron">
        </Jumbotron>
        <div className="homeGallery">
          <Container>
            <h2>{this.state.heading}</h2>
              <div className="imgFluid">
                {this.props.store.paintings.map((painting) => {
                  return <>
                    <PaintingGallery className='paintingGalleryItem' painting={painting} history={this.props.history}/>
                    </>
                })}
              </div>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(LandingPage));
