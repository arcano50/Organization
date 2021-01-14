import React, { useState } from 'react'
import Modal from 'react-modal'
import action from '../redux/action/index'
import parser from 'html-react-parser'
import { useDispatch } from 'react-redux'

import './Home.css'

export default () => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState()

  const openModal = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setContent('<p style="text-align: center;"><span style="font-size: 24pt;">Capacitaci&oacute;n de liderazgo</span></p><p style="text-align: left;"><span style="font-size: 12pt;">Se les invita a todos lo miembros a la capascitaci&oacute;n de liderazgo para emprendedores.</span></p><p style="text-align: left;"><span style="font-size: 12pt;"><strong>Lugar:</strong> <em>Hotel El Jefe</em></span></p><p style="text-align: left;"><span style="font-size: 12pt;"><strong>D&iacute;a:</strong> <em>Mi&eacute;rcoles 27 de noviembre</em></span></p><p style="text-align: left;"><span style="font-size: 12pt;"><strong>Hora:</strong> <em>17:30</em></span></p><p style="text-align: left;">&nbsp;</p><p style="text-align: left;"><span style="font-size: 12pt;"><em>Los esperamos...</em></span></p>')
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const News = () => {
    return (
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={close}>
          <div className='news-container'>
            {isOpen && parser(content)}
          </div>
          <div className='modal-button-box'>
            <button onClick={close}>Cerrar</button>
          </div>
      </Modal>
    )
  }

  const Home = () => {
    return (
      <>
        <div className='row'>
          <div className='element'>
            <a>
              <div className='news-title'>
                <h5>
                  Únete al programa de aprendizaje
                </h5>
              </div>
            </a>
          </div>
          <div className='element'>
            <a>
              <div className='news-title'>
                <h5>
                  Únete al programa de aprendizaje
                </h5>
              </div>
            </a>
          </div>
          <div className='element'>
            <a>
              <div className='news-title'>
                <h5>
                  Únete al programa de aprendizaje
                </h5>
              </div>
            </a>
          </div>
          <div className='element'>
            <a href='' onClick={openModal}>
              <div className='news-title'>
                <h5>
                  Únete al programa de aprendizaje
                </h5>
              </div>
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <News/>
      <Home/>
    </>
  )
}