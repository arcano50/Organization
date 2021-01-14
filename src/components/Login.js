import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import action from '../redux/action/index'

import './Login.css'

export const Warning = ({message}) =>
  <div className="error-container">
    <span className="svg-container">
      <svg viewBox='0 0 24 24' className="svg" xmlns="https://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    </span>
    <label className='error-message'>
      { message }
    </label>
  </div>

export default () => {
  const showing = useRef(null)
  const user = useSelector(({user}) => user)
  const history = useHistory()
  const dispatch = useDispatch()
  const { clearErrors, errors, getValues, handleSubmit, register, setError, trigger } = useForm()

  useEffect(() => {
    let show
    if (!showing || user?.idUser==undefined) return
    else if (user.idUser==0) show = 'unsubscribed'
    else if (user.idAccount==0) show = 'unregistered'
    else if (user.token==0) show = 'incorrect-password'
    else show = 'to-left'
    console.log(show)
    showing.current.classList.add(show)
    //if(user.token && user.token!=0) localStorage.setItem(user)
  }, [user])

  const next = current => {
    current.preventDefault()
    trigger('username').then(result => {
      if (result) dispatch( action.user.checkAccount(getValues('username')) )
      return result
    })
  }

  const onSubmit = data => {
    dispatch( action.user.login(data) )
    history.replace('/home')
  }

  const useStyle = () => {
    if (user && user.idAccount!==0)
      return 'to-left'
    else console.log('No registered')
    return ''
  }

  return (
    <div className='login-box'>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <label className='attractive-text-1'>
          Movimiento Social
        </label>
        <div className='login-slide'>
          <div ref={showing} className='login-slide-container'>
            <div className='text-container-pair'>
              <label className='attractive-text-2'>
                Inicio de Sesión
              </label>
            </div>
            <div className='floating-placeholder'>
              <input
                name='username'
                autoComplete='off'
                onChange={({target}) => {
                  clearErrors('username')
                  target.value ? target.classList.add('is-not-empty')
                    : target.classList.remove('is-not-empty')
                  if (!target.value.match(/^(\s*|\d+)$/))
                    setError("username", {
                      type: "manual",
                      message: "Ingresa únicamente números"
                    })
                }}
                isValid={errors.username?'false':'true'}
                ref={
                  register({
                    required: 'Ingrese su número de identificación',
                    pattern:{
                      value:/^[0-9]*$/,
                      message:'Ingrese únicamente números'
                    }
                  })
                }
              />
              <label className='for-input'>
                Usuario
              </label>
              {errors.username && <Warning message={errors.username.message}/>}
            </div>
            <button onClick={next} className='login-button'>Continuar</button>
          </div>

          <div className='login-slide-container in-right'>
            <div className='text-container-pair'>
              <label className='attractive-text-2'>
                Bienvenido,
              </label>
              <label className='attractive-text-3'>
                {user && user.name}
              </label>
            </div>
            <div className='floating-placeholder'>
              <input
                type='password'
                name='password'
                isValid={errors.password?'false':'true'}
                ref={
                  register({
                    required: 'Ingrese su contraseña',
                  })
                }
              />
              <label className='for-input'>
                Contraseña
              </label>
              {errors.password && <Warning message={errors.password.message}/>}
            </div>
            <button onClick={handleSubmit} className='login-button'>Continuar</button>
          </div>
        </div>
      </form>
    </div>
  )
}
