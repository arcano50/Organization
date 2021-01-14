import React, { useState } from 'react'
import action from '../redux/action/index'
import { useDispatch, useSelector} from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from "react-hook-form"
import { Pie } from './Statistics'
import './News.css'

import './Report.css'

export default () => {
  const dispatch = useDispatch()

  const [data, setData] = useState(
    [
      {title: 'Agradecimientos', value: 25, color: '#15ff00' },
      {title: 'Ofrecimientos', value: 10, color: '#009dff' },
      {title: 'Solicitudes', value: 20, color: '#ff4900' }])

  return (
    <>
      <Pie data={data}/>
    </>
  )
}