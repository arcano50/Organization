const User = (state = {}, action) => {
  switch (action.type){
    case 'getUser':
      return action.data
    default:
      return {}
  }
}

export default User