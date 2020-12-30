import React from 'react'

export default () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  return (
    <div>
      <form className='form'>
        <label className='attractive-text'>
          Iniciar Sesión
        </label>
        <input
          name='username'
          value={username}
          placeholder='Usuario'
          onChange={e => setUsername(e.target.value)}
          ref={
            register({
                required: 'Requerido'
            })
          }
        />
        {errors.username && errors.username.message}

        <input
          type='password'
          name='password'
          value={password}
          placeholder='Contraseña'
          onChange={e => setPassword(e.target.value)}
          ref={
            register({
                required: 'Requerido'
            })
          }
        />
        {errors.password && errors.password.message}
      </form>
    </div>
  )
}
