import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import action from '../redux/action/index'
import { Roles } from './Utils'
import './HierarchyNavigation.css'

const editPermissions = [Roles.ADMIN]

const user = JSON.parse(localStorage.getItem('user'))

const AddressInformation = ( { object } ) => {
  const { handleSubmit, register, errors } = useForm()
  const [readOnly, setReadOnly] = useState(true)
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (object !== undefined){
      setCountry(object.country)
      setState(object.state)
      setCity(object.city)
      setAddress(object.address)
    }
    else setReadOnly(false)
  }, [])

  return (
    <>
      <h4><span>Dirección de residencia</span></h4>
      <div className='row'>
        <form className='form'>
          <div>
            <div>
              <label>País: </label>
            </div>
            <input
              readOnly={readOnly}
              name='country'
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
            {errors.country && errors.country.message}
          </div>
          <div className='row'>
            <div className='column'>
              <div>
                <label>Estado / Provincia / Región: </label>
              </div>
              <input
                readOnly={readOnly}
                name='state'
                value={state}
                onChange={e => setState(e.target.value)}
              />
              {errors.state && errors.state.message}
            </div>
            <div className='column'>
              <div>
                <label>Ciudad: </label>
              </div>
              <input
                readOnly={readOnly}
                name='city'
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              {errors.city && errors.city.message}
            </div>
          </div>
          <div>
            <div>
              <label>Dirección: </label>
            </div>
            <textarea
              readOnly={readOnly}
              name='address'
              value={address}
              rows='2'
              onChange={e => setAddress(e.target.value)}
            />
            {errors.address && errors.address.message}
          </div>
        </form>
        {editPermissions.includes(user.role) &&
          <div className='button-box'>
            <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
            <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
            <button className='small-button cancel-button' title='Cancelar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
          </div>
        }
      </div>
    </>
  )
}

const ContactInformation = ( { object } ) => {
  const [readOnly, setReadOnly] = useState(true)
  const [emailCollection, setEmailCollection] = useState([])
  const [telephoneCollection, setTelephoneCollection] = useState([])

  useEffect(() => {
    if (typeof object !== 'undefined'){
      setEmailCollection(object.emailCollection)
      setTelephoneCollection(object.telephoneCollection)
    }
    else setReadOnly(false)
  }, [])

  let ContactList = ( { object } ) => 
    <ol className='list-box'>
      {
        
        object.map( (item, index) => 
          <li className='item-box'>
            <label> { item } </label>
            <div className='button-box'>
              <button className='small-button delete-button'
                onClick={() => setEmailCollection( value => value.splice(index, 1))}/>
            </div>
          </li>
        )
      }
    </ol>

  return (
    <>
      <h4><span>Información de contacto</span></h4>
      <div>
          <div className='row'>
            <div className='column'>
              {
                telephoneCollection == null ? null : <ContactList object={telephoneCollection}/>
              }
            </div>
            <div className='column'>
              {
                telephoneCollection == null ? null : <ContactList object={emailCollection}/>
              }
            </div>
          </div>
      </div>
    </>
  )
}

export default () => {
  const { handleSubmit, register, errors } = useForm()

  let user = useSelector(({user}) => user.user)

  console.log(user)

  let PersonalInformation = () => {
    const [readOnly, setReadOnly] = useState(true)
    const [cardId, setCardId] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')

    useEffect(() => {
      if (user !== undefined){
        setName(user.name)
        setLastname(user.lastname)
        setCardId(user.cardId)
      }
      else setReadOnly(false)
      
    }, [])

    let save = () =>{
    }

    return (
      <>
        <h4><span>Información básica</span></h4>
        <div className= 'row'>
          <form className='form'>
            <div>
              <label>Identificación: </label>
            </div>
            <input
              readOnly={readOnly}
              name='cardId'
              value={cardId}
              onChange={e => setCardId(e.target.value)}
              ref={
                register({
                    required: 'Requerido',
                    pattern:{
                      value:"[0-9]",
                      message: "Ingrese sólo números"
                    }
                })
              }
            />
            {errors.cardId && errors.cardId.message}
            <div className='row'>
              <div className='column'>
                <div>
                  <label>Nombre: </label>
                </div>
                <input
                  readOnly={readOnly}
                  name='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  ref={
                    register({
                      required: 'Requerido',
                      pattern:{
                        value:"^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)",
                        message: "Formato de nombre incorrecto"
                      }
                    })
                  }
                />
                {errors.name && errors.name.message}
              </div>
              <div className='column'>
                <div>
                  <label>Apellido: </label>
                </div>
                <input
                  readOnly={readOnly}
                  name='lastname'
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                  ref={
                    register({
                      required: 'Requerido',
                      pattern:{
                        value:"^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)",
                        message: "Formato de nombre incorrecto"
                      }
                    })
                  }
                />
                {errors.lastname && errors.lastname.message}
              </div>
            </div>
          </form>
          {editPermissions.includes(user.role) &&
            <div className='button-box'>
              <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
              <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => {setReadOnly(true); save()}}/>
              <button className='small-button cancel-button' title='Cancelar' hidden={ readOnly} onClick={() => setReadOnly(true)}/>
            </div>
          }
        </div>
      </>
    )
  }
      
  return (
    <div className='personal-information-box'>
      <PersonalInformation/>
      <ContactInformation/>
      <AddressInformation object={user}/>
    </div>
  )
}