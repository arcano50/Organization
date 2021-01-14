import services from '../../services/ComunityServices';

const checkAccount = username => dispatch => services.checkAccount(username)
  .then(({data}) =>
    dispatch( {type:'setUser', data} ))
  .catch(error => console.error(error))

const login = data => dispatch => services.login(data)
  .then(({data}) => {
    if (data.token==0) data = { token: data, logged: false }
    else data = { token: data, logged: true }
    dispatch( {type:'setToken', data} )})
  .catch(error => console.error(error))

const setUser  = user => ({type: 'setUser', data: user})

export default { checkAccount, login, setUser }