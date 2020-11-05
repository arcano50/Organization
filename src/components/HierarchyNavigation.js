import React, {memo, useState} from 'react'
import { useForm } from "react-hook-form"
import './HierarchyNavigation.css'

export default ( {data} ) => {

  const [hierarchy, setHierarchy] = useState(data)
  const [level, setLevel] = useState(data)
  const [user, setUser] = useState()
  const [tree, setTree] = useState([hierarchy])
  const [IsShowingLevel, setIsShowingLevel] = useState(true)
  const [updateTree, setUpdateTree] = useState(false)

  let _setLevel = key => {
    setUpdateTree(true)
    let path = key.split(".").filter( value => value.length != 0 )
    let level = hierarchy
    let tree = [level]
    let id
    path.shift()
    while (typeof (id = path.shift()) !== 'undefined'){
      level = level.childrenCollection.find(node => node.id == id)
      tree.push(level)
    }
    setLevel(level)
    setTree(tree)
  }

  let AdministrativeLevelInformation = () => 
    <div>
      <hr/>
      <label>Nombre: </label> {level.name}
      <button>Nuevo miembro</button>
      <hr/>
      <MemberList/>
      
      <hr/>
    </div>

  let _setUser = id => {
    setUser(() => level.memberCollection.find(member => member.id = id))
    setIsShowingLevel(false)
  }

  let MemberList = () => 
    <ol className='list-box'>
      {
        level.memberCollection.map( member =>
          <li className='item-box' key={ member.id } onClick={() => _setUser(member.id)}>
            <label> { member.name } </label>
            <div className='button-box'>
              <button className='small-button delete-button'/>
            </div>
          </li>
        )
      }
    </ol>

  let UserInformation = () => {
    const { handleSubmit, register, errors } = useForm()

    let PersoanlInformation = () => {
      const [readOnly, setReadOnly] = useState(true)
      const [cardId, setCardId] = useState(user.cardId)
      const [name, setName] = useState(user.name)
      const [lastname, setLastname] = useState(user.lastname)

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
            <div className='button-box'>
              <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
              <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
              <button className='small-button cancel-button' title='Cancelar' hidden={ readOnly} onClick={() => setReadOnly(true)}/>
            </div>
          </div>
        </>
      )
    }

    let AddressInformation = () => {
      const [readOnly, setReadOnly] = useState(true)
      const [country, setCountry] = useState(user.country)
      const [state, setState] = useState(user.state)
      const [city, setCity] = useState(user.city)
      const [address, setAddress] = useState(user.address)

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
            <div className='button-box'>
              <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
              <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
              <button className='small-button cancel-button' title='Cancelar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
            </div>
          </div>
        </>
      )
    }
        
    return (
      <div className='personal-information-box'>
        <PersoanlInformation/>
        <AddressInformation/>
      </div>
    )
  }

  let HierarchyTree = ({tree, path}) => {
    let _tree = [ ...tree ]
    let node = _tree.shift()
    path += '.' + node.id
    return node.hasOwnProperty('childrenCollection') ?
      <div className='hierarchy-tree-container'>
        <li className='item-hierarchy-box item-box' onClick={() => _setLevel(path)}>
          <label>{node.name}</label>
        </li>
        {
          _tree.length > 0 ?
            <HierarchyTree tree={_tree} path={path}/>
            :
            <div className='hierarchy-tree-container'>
              {
                node.childrenCollection.map( node =>
                  <li className='item-hierarchy-box item-box' onClick={() => _setLevel(path + '.' + node.id)}>
                    <label>{node.name + ' dA'}</label>
                  </li>
                )
              }
            </div>
          }
      </div>
      :
      <li className='item-leaf-hierarchy-box item-box' onClick={() => _setLevel(path)}>
          <label>{node.name + 'dB'}</label>
      </li> 
  }

  return (
      <div className='hierarchy-container'>
          <div className='hierarchy-tree'>
            <HierarchyTree tree = {tree} path={''}/>
          </div>
          <div className='level-information'>
              {
                  IsShowingLevel ? <AdministrativeLevelInformation/> : <UserInformation/>
              }
          </div>
      </div>
  )
}
