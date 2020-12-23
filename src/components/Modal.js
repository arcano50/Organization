import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import action from '../redux/action/index'
import { useDispatch, useSelector} from 'react-redux'
import { useForm } from "react-hook-form"

export default () => {

  const isOpen = useSelector(({modal}) => modal.visibility)

  //const [isOpen,setIsOpen] = useState(true);
  const level = useSelector(({element}) => element.element)

  function initialize() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  let close = () => {
  }

  let BasicElementInformation = () => {
    const { handleSubmit, register, errors } = useForm()
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
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterOpen={initialize}
      onRequestClose={close}
      contentLabel='Nuevo'>
        <BasicElementInformation/>
    </Modal>
  )
}