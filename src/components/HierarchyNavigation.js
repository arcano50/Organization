import React from 'react'
import HierarchyTree from './HierarchyTree'
import HierarchyInformation from './HierarchyElementInformation'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import User from './User'
import './HierarchyNavigation.css'
import Modal from './AddHierarchyElement'

export default () => {
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
