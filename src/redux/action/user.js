const getUser = user => ({type: 'getUser', data: user})

const getView = view => ({type: 'getView', data: view})

const setUser = user => dispatch => dispatch(getUser(user))

const setView = view => dispatch => dispatch(getView(view))

export default { setUser, setView }