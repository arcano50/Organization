import React, {useEffect, useState} from 'react'
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import Select from 'react-select'
import { useForm } from "react-hook-form"
import './HierarchyNavigation.css'
import test from '../services/ComunityServices'
import ComunityServices from '../services/ComunityServices';
//Modal.setAppElement('#yourAppElement')

export default ( {data} ) => {

  const [hierarchy, setHierarchy] = useState(data)
  const [level, setLevel] = useState(data)
  let [user, setUser] = useState()
  const [IsShowingLevel, setIsShowingLevel] = useState(true)
  const [index, setIndex] = useState([])



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
  function openModal(index) {
    console.log(index)
    setIsOpen(true);
    setIndex(index.split('.'))
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


  let _setLevel = (index) => {
    let path = [...index]
    let level = hierarchy
    let id
    console.log(path)
    path.shift()
    while (typeof (id = path.shift()) !== 'undefined'){
      level = level.childrenCollection.find(node => node.id == id)
    }
    setIndex(index)
    setLevel(level)
    return true;
  }

  let toPrint = () => {test.test({}).then((res) => {
    console.log(res.data)
  }).catch((me) => console.log(me))}

  let AdministrativeLevelInformation = ({index}) => {
    const { handleSubmit, register, errors } = useForm()

    console.log(index)

    let CoordinationInformation = () => {
      return (
        <>
          <BasicCoordinationInformation/>
          {
            index.length == 2 ? 
            <>
              <ContactInformation _object={level}/>
              <AddressInformation _object={level}/>
            </>
            :
            null
          }
        </>
      )
    }

    let BasicCoordinationInformation = () => {
      const [readOnly, setReadOnly] = useState(true)
      const [cardId, setCardId] = useState('')
      const [name, setName] = useState('')
      const [website, setWebsite] = useState('')

      useEffect(() => {
        if (typeof level !== 'undefined'){
          setName(level.name)
          setWebsite(level.website)
          setCardId(level.cardId)
        }
        else setReadOnly(false)
        
      }, [])

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
    }

    let NodeInformation = () =>
      <div>
        <label>Nombre: </label> {level.name}
        <button onClick={toPrint}>Nuevo miembro</button>
      </div>

    return (
      <div>
        <CoordinationInformation/>
        <h4><span>Lista de miembros</span></h4>
        <MemberList/>
      </div>
    )
  }

  let _setUser = id => {
    setUser(() => level.memberCollection.find(member => member.id = id))
    setIsShowingLevel(false)
  }

  let ContactInformation = ( { _object } ) => {
    const [readOnly, setReadOnly] = useState(true)
    const [emailCollection, setEmailCollection] = useState([])
    const [telephoneCollection, setTelephoneCollection] = useState([])

    console.log(_object)

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
                <ListingTelephoneCollection object={telephoneCollection}/>
              </div>
              <div className='column'>
                <ListingEmailCollection object={emailCollection}/>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }

  let AddressInformation = ( { _object } ) => {
    const { handleSubmit, register, errors } = useForm()
    const [readOnly, setReadOnly] = useState(true)
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
      if (typeof _object !== 'undefined')
        user = _object
      if (typeof user !== 'undefined'){
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
          <div className='button-box'>
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

    let PersonalInformation = () => {
      const [readOnly, setReadOnly] = useState(true)
      const [cardId, setCardId] = useState('')
      const [name, setName] = useState('')
      const [lastname, setLastname] = useState('')

      useEffect(() => {
        if (typeof user !== 'undefined'){
          setName(user.name)
          setLastname(user.lastname)
          setCardId(user.cardId)
        }
        else setReadOnly(false)
        
      }, [])

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
        
    return (
      <div className='personal-information-box'>
        <PersonalInformation/>
        <AddressInformation/>
      </div>
    )
  }

  const HierarchyTree = () => {
    let Expand = ( { index } ) => {
      let key = index.split(".")
      let level = hierarchy
      let id
      key.shift()
      while (typeof (id = key.shift()) !== 'undefined')
        level = level.childrenCollection.find(node => node.id == id)
      return (
        <ol>
        {
          level.childrenCollection.map( node =>
            <div flex-in-line>
              <li className='item-hierarchy-box item-box contracted'
                index={index + '.' + node.id} onClick={nodeAction}>
                <label className='label-box'>{node.name}</label>
                <div className='button-box'>
                  <button className='small-button add-button' title='Agregar nodo' onClick={() => openModal(index + '.' + node.id)}/>
                </div>
              </li>
            </div>
          )
        }
        </ol>
      )
    }

    let nodeAction = ( node ) => {
      setIsShowingLevel(true)
      let item = node.target
      console.log(item)
      let index = item.getAttribute('index')
      if(item.type == 'submit')
        return;
      if(typeof item.type === 'undefined'){
        console.log(item.parentNode)
        index = item.parentNode.getAttribute('index')
        console.log(index)
        _setLevel(index.split('.'))
        return;
      }
      //console.log
      //if(node.target.is('[type="li"]'))
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      node.preventDefault()
      if (item.classList.contains('expanded')){
        item.parentNode.removeChild(item.parentNode.lastChild)
        item.classList.replace('expanded', 'contracted')
      }
      else{
        item.classList.replace('contracted', 'expanded')
        let parent = item.parentNode
        let react_html = Expand( { index } )
        let html = ReactDOMServer.renderToStaticMarkup(react_html)
        let child = document.createElement('div')
        child.insertAdjacentHTML('beforeend', html)
        child.firstChild.childNodes.forEach( element => {
          element.addEventListener('click', nodeAction)
          element.firstChild.lastChild.firstChild.addEventListener(
            'click', () => openModal(element.firstChild.getAttribute('index')))
        }
        )
        parent.appendChild(child.firstChild)
      }
    }
    
    return (
      <Expand index='0'/>
    )
  }

  const ToAdd =  () => {
    const [selected, setSelected] = useState(0)
    const [options, setOptions] = useState([])

    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)

    useEffect(() => {
      setOptions([{value: 'Prueba', label:'Prueba 1'}])
    }, [])

    return (
      <Modal
        className='none'
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"> 
        
        <div>Agregar un grupo</div>
        <form className='form'>
          <div>
            <div>
              <label>Nombre: </label>
            </div>
            <input
              placeholder='Ingrese el nombre del nuevo nivel'
              name='name'
              value={name}
              defaultValue='<No definido>'
            />
            {/*
            <select name="cars" id="cars">
              {list.map( item =>
                <option value={`${item.name} ${item.name}`}/>)
                }
            </select>
              */}
            {
              index.length == 4 ? <>
                <div>
                  <label>Número de grupo: </label>
                </div>
                <input
                  placeholder='Ingrese el nombre del nuevo nivel'
                  name='name'
                  value={number}
                  defaultValue='<No definido>'/>
                <div>
                  <label>Monitor: </label>
                </div>
                <Select
                  placeholder='Seleccione el monitor'
                  value={selected}
                  onChange={selected => setSelected(selected)}
                  options={options}/>
              </>
              :
              null
            }
          </div>
        </form>
        <button onClick={closeModal}>Agregar</button>
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

  return (
      <div className='hierarchy-container'>
          <ToAdd />
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
