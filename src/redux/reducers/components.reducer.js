import { combineReducers } from 'redux';

const componentsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMPONENTS':
        return action.payload;
      default:
        return state;
    }
  };

const methodsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_METHODS':
      return action.payload;
    default:
      return state;
  }
}

const colorsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COLORS':
      return action.payload;
    default:
      return state;
  }
}

const toolsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TOOLS':
      return action.payload;
    default:
      return state;
  }
}
  
  // user will be on the redux state at:
  // state.user
  export default combineReducers({
    componentsReducer,
    methodsReducer,
    colorsReducer,
    toolsReducer
  });