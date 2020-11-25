import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';
import EditMethod from '../EditComponents/EditMethod';
import EditColor from '../EditComponents/EditColor';
import EditTool from '../EditComponents/EditTool';
import './PaintingDetails.css'

class PaintingDetails extends Component {

  state ={
    view: 'details'
  }

  componentDidMount = () => {
    this.getComponents();
  }

  getComponents = () => {
    this.props.dispatch({type: 'FETCH_METHODS', id: this.props.store.paintingDetails[0].painting_id});
    this.props.dispatch({type: 'FETCH_COLORS', id: this.props.store.paintingDetails[0].painting_id});
    this.props.dispatch({type: 'FETCH_TOOLS', id: this.props.store.paintingDetails[0].painting_id});
  }

  // Returns user to Gallery Home Page on click of Return to Gallery button
  returnToHome = () => {
      // this.props.history.push('/home');
    this.getComponents();
  }

  editClick = () => {
    this.props.history.push('/edit')
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
        <div className='detailsMethod'>
          <h4>Methods</h4>
          <ul>
            {this.props.store.componentDetails.methodsReducer.map((method) => {
              return < EditMethod state={this.state} method={method} getComponents={this.getComponents}/>
            })}
          </ul>
        </div>
        <div className='colorDetail'>
          <h4>Colors</h4>
          <ul>
            {this.props.store.componentDetails.colorsReducer.map((color) => {
              return < EditColor state={this.state} color={color} getComponents={this.getComponents}/>
            })}
          </ul>
        </div>
        <div className='toolDetail'>
          <h4>Tools</h4>
          <ul>
            {this.props.store.componentDetails.toolsReducer.map((tool) => {
              return < EditTool state={this.state} tool={tool} getComponents={this.getComponents}/>
            })}
          </ul>
        </div>
        <button id='returnDetail' onClick={this.returnToHome}>Return to Home</button>

        {/* this.props.store.paintingDetails[0].user_id === this.props.store.user.id ? */}
        <button onClick={this.editClick}>Edit Painting</button>

      </div>
    );
  }
}

// return <li key={component.id}>{component.brand} {component.name}</li>

export default withRouter(connect(mapStoreToProps)(PaintingDetails));