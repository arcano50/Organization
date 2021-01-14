const initialState = { }

const UserReducer = (state = initialState, {type, data}) => {
  switch (type){
    case 'setUser':
      return data
    case 'setToken':
      return {...state, ...data}
    default:
      return state
  }
}

export default UserReducer