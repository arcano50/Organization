const initialState = {
  visibility: false
}

const ModalReducer = (state = initialState, action) => {
  switch (action.type){
    case 'getVisibility':
      return {...state, visibility: action.data}
    default:
      return state
  }
}

export default ModalReducer