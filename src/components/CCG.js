import React, { useState } from 'react'
import Modal from 'react-modal'
import action from '../redux/action/index'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch, useSelector} from 'react-redux'
import { useForm } from 'react-hook-form'
import './News.css'

export default () => {
  const isOpen = useSelector(({ccg}) => ccg.visibility)
  const dispatch = useDispatch()

  const { handleSubmit, register, errors } = useForm()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const close = () => dispatch( action.ccg.setVisibility(false) )

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={close}
      contentLabel='Enviar CCG'>
        <h4><span>Enviar CCG</span></h4>
        <form className='form'>
          <div>
            <label>Tipo de CCG: </label>
          </div>
          <select name='type'>
            <option value='1'>Agradecimiento</option>
            <option value='2'>Ofrecimiento</option>
            <option value='3'>Petitoria</option>
          </select>
          <div>
            <label>Asunto: </label>
          </div>
          <input
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            ref={
              register({
                required: 'Requerido'
              })
            }
          />
          {errors.title && errors.title.message}

          <div>
            <label>Contenido del CCG: </label>
          </div>
          <Editor
            apiKey="mucvc29hbuyofkcpdj93bzuesoq3y915aqc9ebiwplvp7a7u"
            init={{
              height: 300,
              menubar: true,
              plugins: [
                'advlist autolink lists link image', 
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help'
            }}
            onChange={e => setContent(e.target.getContent())}
          />

          <button onClick={close}>Cerrar</button>
        </form>
    </Modal>
  )
}