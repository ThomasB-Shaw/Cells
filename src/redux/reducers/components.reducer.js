const componentsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMPONENTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default componentsReducer;