import React, { useState } from 'react'
import CCG from './CCG'
import { Pie } from './Statistics'

import './Report.css'

export default () => {
  
  const [isOpen, setIsOpen] = useState(false)

  const [data, setData] = useState([{x:'Solicitudes', y:100},
  {x:'Agradecimientos', y:25},{x:'Sugerencias', y:75}])

  return (
    <>
      <div>
        <button onClick={() => setIsOpen(true)}>Redactar CCG</button>
      </div>
      <Pie data={data}/>
      <CCG open={isOpen}/>
    </>
  )
}