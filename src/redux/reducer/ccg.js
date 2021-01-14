const initialState = {
  visibility: false
}

export default (state = initialState, action) => {
  switch (action.type){
    case 'getCCGVisibility':
      return {...state, visibility: action.data}
    default:
      return state
  }
}