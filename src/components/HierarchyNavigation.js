import React from 'react'
import HierarchyTree from './HierarchyTree'
import HierarchyInformation from './HierarchyElementInformation'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import User from './User'
import './HierarchyNavigation.css'
import Modal from './Modal'

export default () => {
  /*
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



    const [readOnly, setReadOnly] = useState(true)
    const [isGroup, setIsGroup] = useState(false)
    const [isCoordination, setIsCoordination] = useState(false)
    const [legalId, setLegalId] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState()
    const [website, setWebsite] = useState('')
    const [selected, setSelected] = useState(0)
    const [options, setOptions] = useState([])
*/
  let view = useSelector(user => user.user.view)
  const route = () => {
    if (view == 0)
      return (<HierarchyInformation/>)
    if(view == 1)
      return (<User/>)
    return null
  }

  return (
      <div className='hierarchy-container'>
        <Modal/>
          <div className='hierarchy-tree list-box'>
            <HierarchyTree />
          </div>
          <div id='information' className='level-information'>
            {
              route()
            }
          </div>
      </div>
  )
}
