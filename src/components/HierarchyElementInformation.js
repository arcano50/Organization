import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import './HierarchyNavigation.css'
import action from '../redux/action/index'
import Modal from './Modal'

export default () => {

  const level = useSelector(({element}) => element.element)

  const dispatch = useDispatch()

  let userDetail = event => {
    let member = event.target
    while (!member.classList.contains('item-box'))
      member = member.parent
    let id = member.getAttribute('index')
    let user = level.memberCollection.find(item => item.id == id)
    dispatch(action.user.setUser(user))
    dispatch(action.user.setView(1))
  }

  let MemberList = () => 
    <ol className='list-box'>
      {
        level.memberCollection === undefined ? null :
          level.memberCollection === null ?
            <li className='item-box'>
              <label> &lt;No hay miembros&gt; </label>
            </li>
          :
          level.memberCollection.map( member =>
            <li className='item-box' index={ member.id } onClick={userDetail}>
              <label> { member.name } </label>
              <div className='button-box'>
                <button hidden={level.number===undefined} className='small-button delete-button'/>
                <button className='small-button disable-button'/>
                <button className='small-button upgrade-button'/>
              </div>
            </li>
          )
      }
    </ol>

  let AdministrativeLevelInformation = () => {

    const { handleSubmit, register, errors } = useForm()

    let BasicElementInformation = ({_isGroup, _isToAdd}) => {
      const [readOnly, setReadOnly] = useState(true)
      const [legalId, setLegalId] = useState('')
      const [name, setName] = useState('')
      const [number, setNumber] = useState()
      const [website, setWebsite] = useState('')

      useEffect(() => {
        if (level !== undefined){
          setLegalId(level.legalId)
          setName(level.name)
          setNumber(level.number)
          setWebsite(level.website)
        }
        else setReadOnly(false)
      }, [])

      switch(level.type){
        case 'COORDINATION':
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
                    value={legalId}
                    onChange={e => setLegalId(e.target.value)}
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

                  <div>
                    <label>Número de grupo: </label>
                  </div>
                  <input
                    readOnly={readOnly}
                    name='number'
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    ref={
                      register({
                        required: 'Requerido',
                        pattern:{
                          value:"[0-9]",
                          message: "Ingrese un número"
                        }
                      })
                    }
                  />
                  {errors.number && errors.number.message}

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

                  <div>
                    <label>Sitio web: </label>
                  </div>
                  <input
                    readOnly={readOnly}
                    name='website'
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
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
                  {errors.website && errors.website.message}
                </form>
                <div className='button-box'>
                  <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
                  <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
                  <button className='small-button cancel-button' title='Cancelar' hidden={ readOnly} onClick={() => setReadOnly(true)}/>
                </div>
              </div>
            </>
          )
        case 'ZONE':
        case 'BRANCH':
          return(
            <>
              <h4><span>Información básica</span></h4>
              <div className= 'row'>
                <form className='form'>
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
                </form>
                <div className='button-box'>
                  <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
                  <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
                  <button className='small-button cancel-button' title='Cancelar' hidden={ readOnly} onClick={() => setReadOnly(true)}/>
                </div>
              </div>
            </>
          )
        case 'GROUP':
          return (
            <>
              <h4><span>Información básica</span></h4>
              <div className= 'row'>
                <form className='form'>
                  <div>
                    <label>Número de grupo: </label>
                  </div>
                  <input
                    readOnly={readOnly}
                    name='number'
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    ref={
                      register({
                        required: 'Requerido',
                        pattern:{
                          value:"[0-9]",
                          message: "Ingrese un número"
                        }
                      })
                    }
                  />
                  {errors.number && errors.number.message}

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
                </form>
                <div className='button-box'>
                  <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
                  <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
                  <button className='small-button cancel-button' title='Cancelar' hidden={ readOnly} onClick={() => setReadOnly(true)}/>
                </div>
              </div>
            </>
          )
        default:
          return null
      }
    }

    return (
      <BasicElementInformation/>
    )
  }

  return (
    <>
      <AdministrativeLevelInformation/>
      <h4><span>Miembros</span></h4>
      <MemberList/>
    </>
  )
}