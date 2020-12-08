import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';
import EditMethod from '../EditComponents/EditMethod';
import EditColor from '../EditComponents/EditColor';
import EditTool from '../EditComponents/EditTool';
import {Col, Row, Button, Container } from 'reactstrap';
import './PaintingDetails.css'

class PaintingDetails extends Component {
  //Used to conditionally Render
  state ={
    view: 'details',
    date: Date(this.props.store.paintingDetails[0].date)
  }

  // On page load get all components for selected painting
  componentDidMount = () => {
    this.getComponents();
    this.makeDate();
  }

  // complied all Fetch dispatches for components for a specific painting
  getComponents = () => {
    this.props.dispatch({type: 'FETCH_METHODS', id: this.props.store.paintingDetails[0].painting_id});
    this.props.dispatch({type: 'FETCH_COLORS', id: this.props.store.paintingDetails[0].painting_id});
    this.props.dispatch({type: 'FETCH_TOOLS', id: this.props.store.paintingDetails[0].painting_id});
  }

  // Returns user to Gallery Home Page on click of Return to Gallery button
  returnToHome = () => {
      this.props.history.push('/home');
  }

  // Sends user to the edit painting page via paintings id
  editClick = () => {
    this.props.history.push('/edit')
  }

  makeDate = () => {
    let year = new Date(this.props.store.paintingDetails[0].date).getFullYear();
    let month = new Date(this.props.store.paintingDetails[0].date).getMonth();
    let day = new Date(this.props.store.paintingDetails[0].date).getDate();

    this.setState({
      ...this.state,
      date: `${month}/${day}/${year}`
    })
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     ...this.state,
  //     date: new Date(this.props.store.paintingDetails[0].date).getFullYear()
  //   };
  // }

  render() {
    return (
      <Container>
        <div className="PaintingDetails">
          <div className='topDetails'>
            <Row>
              <Col></Col>
              <Col>
                {this.props.store.paintingDetails[0] &&
                <h2 className='titleDetail'>{this.props.store.paintingDetails[0].title}</h2>
                }
              </Col>
              <Col className="r1c2">
              {this.props.store.paintingDetails[0] &&
                <h4 className='userName'>{this.props.store.paintingDetails[0].username}</h4>
                }
                {this.props.store.paintingDetails[0] &&
                <h4 className='dateDetail'>{this.state.date}</h4>
                }
                {this.props.store.paintingDetails[0] &&
                <h4 className='userDetail'>{this.props.store.paintingDetails[0].size_type}</h4>
                }
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              {this.props.store.paintingDetails[0] &&
              <img id='imgDetail' src={this.props.store.paintingDetails[0].image_url} alt={this.props.store.paintingDetails[0].title}/>
              }
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.store.paintingDetails[0] &&
              <p id='descriptionDetail'>{this.props.store.paintingDetails[0].description}</p>
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 id='componentsDetail'>Components</h3>
            </Col>
          </Row>
          <Row>
            <Col className='paintingComponentDetails'>
              <div className='detailsMethod'>
                <h4 className='componentTitle'>Methods</h4>
                <ul className='listComponent'>
                  {this.props.store.componentDetails.methodsReducer.map((method) => {
                    return < EditMethod state={this.state} method={method} getComponents={this.getComponents}/>
                  })}
                </ul>
              </div>
            </Col>
            <Col>
              <div className='colorDetail'>
                <h4 className='componentTitle' >Colors</h4>
                <ul className='listComponent' >
                  {this.props.store.componentDetails.colorsReducer.map((color) => {
                    return < EditColor state={this.state} color={color} getComponents={this.getComponents}/>
                  })}
                </ul>
              </div>
            </Col>
            <Col>
              <div className='toolDetail'>
                <h4 className='componentTitle' >Tools</h4>
                <ul className='listComponent' >
                  {this.props.store.componentDetails.toolsReducer.map((tool) => {
                    return < EditTool state={this.state} tool={tool} getComponents={this.getComponents}/>
                  })}
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button id='returnDetail' onClick={this.returnToHome}>Return to Home</Button>
            </Col>
            <Col></Col>
            <Col>
              {this.props.store.paintingDetails[0].user_id === this.props.store.user.id ?
              <Button onClick={this.editClick}>Edit Painting</Button>
              :
              <p></p>
              }
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(PaintingDetails));