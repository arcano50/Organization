const initialState = {
  user: {},
  view:0
}

const UserReducer = (state = initialState, action) => {
  switch (action.type){
    case 'getUser':
      return {...state, user: action.data}
    case 'getView':
      return {...state, view: action.data}
    default:
      return state
  }
}

export default UserReducer