const initialState = {
  visibility: false
}

export default (state = initialState, action) => {
  switch (action.type){
    case 'getNewsVisibility':
      return {...state, visibility: action.data}
    default:
      return state
  }
}