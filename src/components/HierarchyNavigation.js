import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import Select from 'react-select'
import { useForm } from "react-hook-form"
import './HierarchyNavigation.css'
import Services from '../services/ComunityServices'
//Modal.setAppElement('#yourAppElement')

export default ( {data} ) => {

  const [hierarchy, setHierarchy] = useState(data)
  const [level, setLevel] = useState(data)
  let [user, setUser] = useState()
  const [IsShowingLevel, setIsShowingLevel] = useState(true)
  const [index, setIndex] = useState([])

  useEffect(() => {
    setHierarchy(data)
  }, [data])

  const customStyles = {
    content : {
      position: 'absolute',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '500px'
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal(node) {
    node.stopPropagation()
    node.preventDefault()
    let item = node.target
    console.log(item)
    while (!item.classList.contains('item-box'))
      item = item.parentNode
    let index = item.getAttribute('index').split('.')
    index.push('0')
    setIsOpen(true)
    console.log(index)
    setIndex(index)
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function closeModal(){
    setIsOpen(false);
  }

  const [modalIsOpen2,setIsOpen2] = React.useState(false);
  function openModal2(index) {
    setIsOpen2(true);
    setIndex(index.split('.'))
  }
  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
  function closeModal2(){
    setIsOpen2(false);
  }


  let showLevel = ( current ) => {
    current.stopPropagation()
    current.preventDefault()
    let item = current.target
    while (!item.classList.contains('item-box'))
      item = item.parentNode
    let index = item.getAttribute('index').split('.')
    setIndex([...index])
    let level = hierarchy
    let id
    index.shift()
    while ((id = index.shift()) !== undefined){
      level = level.childrenCollection.find(node => node.id == id)
    }
    setLevel(level)
    setIsShowingLevel(true)
    return true;
  }

  let AdministrativeLevelInformation = ({index, isToAdd}) => {
    const { handleSubmit, register, errors } = useForm()

    console.log(index)

    let CoordinationInformation = () => {
      return (
        <>
          {
            index.length == 2 ? 
            <>
              <BasicElementInformation _isToAdd={isToAdd}/>
              <ContactInformation _object={level} _isToAdd={isToAdd}/>
              <AddressInformation _object={level} _isToAdd={isToAdd}/>
            </>
            :
            <BasicElementInformation _isGroup={index.length==5} _isToAdd={isToAdd}/>
          }
        </>
      )
    }

    let BasicElementInformation = ({_isGroup, _isToAdd}) => {
      const [readOnly, setReadOnly] = useState(true)
      const [isGroup, setIsGroup] = useState(false)
      const [isCoordination, setIsCoordination] = useState(false)
      const [legalId, setLegalId] = useState('')
      const [name, setName] = useState('')
      const [number, setNumber] = useState()
      const [website, setWebsite] = useState('')

      useEffect(() => {
        if(_isToAdd===undefined)
          _isToAdd = false
        if (level !== undefined && !_isToAdd){
          setLegalId(level.legalId)
          setName(level.name)
          setNumber(level.number)
          setWebsite(level.website)
        }
        else setReadOnly(false)
        if (_isGroup === undefined)
          setIsCoordination(true)
        else setIsGroup(_isGroup)
        
      }, [])

      return (
        <>
          <h4><span>Información básica</span></h4>
          <div className= 'row'>
            <form className='form'>
              <div>
                <label hidden={!isCoordination}>Identificación: </label>
              </div>
              <input
                readOnly={readOnly}
                hidden={!isCoordination}
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
                <label hidden={!isGroup}>Número de grupo: </label>
              </div>
              <input
                readOnly={readOnly}
                hidden={!isGroup}
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
                <label hidden={!isCoordination}>Sitio web: </label>
              </div>
              <input
                readOnly={readOnly}
                hidden={!isCoordination}
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
              <button className='small-button edit-button' title='Editar' hidden={!readOnly||_isToAdd} onClick={() => setReadOnly(false)}/>
              <button className='small-button save-button' title='Guardar' hidden={readOnly||!_isToAdd} onClick={() => setReadOnly(true)}/>
              <button className='small-button cancel-button' title='Cancelar' hidden={ readOnly||_isToAdd} onClick={() => setReadOnly(true)}/>
            </div>
          </div>
        </>
      )
    }

    return (
      <div>
        <CoordinationInformation/>
        <h4><span>Lista de miembros</span></h4>
        <button onClick={() => {setUser(); setIsShowingLevel(false)}}>Nuevo miembro</button>
        <MemberList/>
      </div>
    )
  }

  let _setUser = id => {
    setUser(() => level.memberCollection.find(member => member.id == id))
    setIsShowingLevel(false)
  }

  let ContactInformation = ( { _object, _isToAdd } ) => {
    const [readOnly, setReadOnly] = useState(true)
    const [emailCollection, setEmailCollection] = useState([])
    const [telephoneCollection, setTelephoneCollection] = useState([])

    useEffect(() => {
      if (typeof _object !== 'undefined'){
        setEmailCollection(_object.emailCollection)
        setTelephoneCollection(_object.telephoneCollection)
      }
      else setReadOnly(false)
    }, [])

    let ListingTelephoneCollection = ( { object } ) => 
      <ol className='list-box'>
        {
          object.map( (item, index) => 
            <li className='item-box'>
              <label> { item } </label>
              <div className='button-box'>
                <button className='small-button delete-button'
                  onClick={() => setTelephoneCollection( value => value.splice(index, 1))}/>
              </div>
            </li>
          )
        }
      </ol> 

    let ListingEmailCollection = ( { object } ) => 
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
          <form className='form'>
            <div className='row'>
              <div className='column'>
                {
                  telephoneCollection == null ? null : <ListingTelephoneCollection object={telephoneCollection}/>
                }
              </div>
              <div className='column'>
                {
                  telephoneCollection == null ? null : <ListingEmailCollection object={emailCollection}/>
                }
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }

  let AddressInformation = ( { _object, _isToAdd } ) => {
    const { handleSubmit, register, errors } = useForm()
    const [readOnly, setReadOnly] = useState(true)
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
      if (_object !== undefined)
        user = _object
      if (user !== undefined && (_isToAdd === undefined)){
        setCountry(user.country)
        setState(user.state)
        setCity(user.city)
        setAddress(user.address)
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
          <div className='button-box' hidden={_isToAdd}>
            <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
            <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
            <button className='small-button cancel-button' title='Cancelar' hidden={readOnly} onClick={() => setReadOnly(true)}/>
          </div>
        </div>
      </>
    )
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
            <li className='item-box' key={ member.id } onClick={() => _setUser(member.id)}>
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

  let UserInformation = () => {
    const { handleSubmit, register, errors } = useForm()

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
        if((user?.id||0) == 0){
          let user
          Services.addMember(level.id, user?.id||0, cardId, name, lastname).then(result => {
            level.memberCollection.push(result.data)
            setUser(result.data)
            console.log(result.data)
          })
        }
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
            <div className='button-box'>
              <button className='small-button edit-button' title='Editar' hidden={!readOnly} onClick={() => setReadOnly(false)}/>
              <button className='small-button save-button' title='Guardar' hidden={readOnly} onClick={() => {setReadOnly(true); save()}}/>
              <button className='small-button cancel-button' title='Cancelar' hidden={ readOnly} onClick={() => setReadOnly(true)}/>
            </div>
          </div>
        </>
      )
    }
        
    return (
      <div className='personal-information-box'>
        <PersonalInformation/>
        <AddressInformation/>
      </div>
    )
  }

  let DefaultItem = ( { message } ) =>
    <li className='default-item'>
      <label>&lt;{ message }&gt; </label>
    </li>

  const HierarchyTree = () => {

    console.log('Hierarchy tree has been re-render with data:')

    let Expand = ( { index } ) => {
      let key = index.split(".")
      if (key.length > 4)
        return null
      let level = hierarchy
      let id
      key.shift()
      while ((id = key.shift()) !== undefined && level.childrenCollection !== null)
        level = level.childrenCollection.find(node => node.id == id)
      return (  
          level.childrenCollection === undefined ? null :
          level.childrenCollection === null || level.childrenCollection.length == 0 ?
            <DefaultItem message='No hay elementos'/>
          :
            level.childrenCollection.map( node =>
              <div>
                <li className='item-hierarchy-box item-box'
                  index={index + '.' + node.id} onClick={nodeAction}>
                  <i className='expand-image'/>
                  <div className='pair-order'>
                    <label className='label-box' onClick={showLevel}>
                      { node.name }
                    </label>
                    <div className='button-box'>
                      <button className='small-button add-button' title='Agregar elemento' onClick={openModal}/>
                    </div>
                  </div>
                </li>
                <ul/>
              </div>
            )
      )
    }

    let nodeAction = ( node ) => {
      node.preventDefault()
      console.error('¡Qué demonios haces aquí, Fred!')
      let item = node.target
      while (!item.classList.contains('item-box'))
        item = item.parentNode

      let parent = item.parentNode
      let index = item.getAttribute('index')
      if (item.classList.contains('expanded')){
        parent.removeChild(parent.lastChild)
        parent.appendChild(document.createElement('ul'))
        item.classList.toggle('expanded')
      }
      else{
        ReactDOM.render(<Expand index={index}/>, parent.lastChild)
        item.classList.toggle('expanded')
      }
    }
    
    return (
      <ul>
        <Expand index='0'/>
      </ul>
    )
  }

  const AddHierarchtElement =  () => {
    const [readOnly, setReadOnly] = useState(true)
    const [isGroup, setIsGroup] = useState(false)
    const [isCoordination, setIsCoordination] = useState(false)
    const [legalId, setLegalId] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState()
    const [website, setWebsite] = useState('')
    const [selected, setSelected] = useState(0)
    const [options, setOptions] = useState([])





    useEffect(() => {
      setOptions([{value: 'Prueba', label:'Prueba 1'}])
    }, [])

    let addElement = () => {
      let response = Services.addHierarchyElement(number, name, [])
      console.log(response)
    }

    return (
      <Modal
        className='none'
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"> 

        <AdministrativeLevelInformation isToAdd={true} index={index}/>
      </Modal>
    )
  }

  const NewUSer = () => {
    const [selected, setSelected] = useState(0)
    const [options, setOptions] = useState([])

    useEffect(() => {
      setOptions([{value: 'Prueba', label:'Prueba 1'}])
    }, [])
    return (
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen2}
        onAfterOpen={afterOpenModal2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"> 
        <UserInformation/>
        <button onClick={closeModal2}>Agregar</button>
      </Modal>
    )
  }

  if(data == {})
    return(<></>)
  return (
      <div className='hierarchy-container'>
          <AddHierarchtElement />
          <NewUSer/>
          <div className='hierarchy-tree list-box'>
            <HierarchyTree />
          </div>
          <div className='level-information'>
              {
                IsShowingLevel ? <AdministrativeLevelInformation index={index}/> : <UserInformation/>
              }
          </div>
      </div>
  )
}
