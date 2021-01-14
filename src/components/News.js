import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import action from '../redux/action/index'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch, useSelector} from 'react-redux'
import { useForm } from 'react-hook-form'
import './News.css'

export default () => {
  const isOpen = useSelector(({news}) => news.visibility)
  const dispatch = useDispatch()

  const { handleSubmit, register, errors } = useForm()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState()

  let close = () => dispatch( action.news.setVisibiliry(false) )
  
  useEffect(() => {
      setTitle()
      setContent()
      setImage()
  }, [])

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={close}
      contentLabel='Nueva noticia'>
        <h4><span>Publicar noticia</span></h4>
        <form className='form'>
          <div>
            <label>Título de la noticia: </label>
          </div>
          <input
            name='title'
            value={content}
            onChange={e => setTitle(e.target.value)}
            ref={
              register({
                  required: 'Requerido'
              })
            }
          />
          {errors.title && errors.title.message}

          <div>
            <label>Añadir imagen promocional (Opcional): </label>
          </div>
          <label className='input-file'>
            <input type='file'
              accept='.png, .jpg'
              id='image'
              onChange={e => setImage(URL.createObjectURL(e.target.files[0]))}
            />
            Seleccionar Imagen
          </label>
          
          <img src={image}/>

          <div>
            <label>Contenido: </label>
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