function createStore(reducer, initialState){
  var currentReducer = reducer;
  var currentState = initialState;
  var listener = ()=>{}

  return {
    getState(){
      return currentState;
    },
    dispatch(action){
      currentState = currentReducer(currentState, action);
      return action;
    },
    subscribe(newlistener){
      listener = newlistener;
    }
  }
}
