import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import { useDispatch, useSelector} from 'react-redux'
import action from '../redux/action/index'
import { Roles } from './Utils'
import './HierarchyTree.css'

const hierarchyEditPermissions = [Roles.ADMIN]
const user = JSON.parse(localStorage.getItem('user'))

export default () => {
  const hierarchy = useSelector(({tree}) => tree)

  const dispatch = useDispatch()

  console.log('Component has been rendered')
  console.log(hierarchy)

  const searchElement = index => {
    let node = hierarchy
    let path = index.split('.')
    path.shift()
    let id
    while ((id = path.shift()) !== undefined && node.childrenCollection !== null)
      node = node.childrenCollection.find(children => children.id == id)
    return node
  }

  const nodeAction = ( node ) => {
    console.log('nodeAction')
    let item = node.target
    while (!item.classList.contains('item-box'))
      item = item.parentNode
    let parent = item.parentNode
    
    if (!item.firstChild.classList.contains('expanded')
        && !parent.lastChild.hasChildNodes()){
      let index = item.getAttribute('index')
      ReactDOM.render(<Expander index={index}/>, parent.lastChild)
    }
    item.classList.toggle('expanded')
    item.firstChild.classList.toggle('expanded')
    parent.lastChild.classList.toggle('expanded')
  }

  const setElement = current => {
    console.log('setElement')
    current.preventDefault()
    current.stopPropagation()

    let item = current.target
    while (!item.classList.contains('item-box'))
      item = item.parentNode

    let index = item.getAttribute('index')
    let node = searchElement(index)
    dispatch( action.element.setHierarchyElement( node )  )
    dispatch( action.user.setView( 0 ) )
  }

  const addElement = (current) => {
    console.log('addElement')
    current.preventDefault()
    current.stopPropagation()

    let item = current.target
    while (!item.classList.contains('item-box'))
      item = item.parentNode

    let index = item.getAttribute('index')
    let node = searchElement(index)

    dispatch( action.modal.setVisibility(true) )
    dispatch( action.element.setHierarchyElement( node )  )
  }

  const Expander = ( { index } ) => {
    let level = searchElement(index)
    if(level == undefined ||  level.childrenCollection == undefined) return null
    return (
      level && level.childrenCollection && level.childrenCollection !== undefined && level.childrenCollection.length === 0 ?
      <li className='default-item'>
        <label>&lt; No hay elementos &gt; </label>
      </li>
      :
        level.childrenCollection.map( node =>
          <div className='item-container'>
            <li className='item-hierarchy-box item-box'
              index={index + '.' + node.id} onClick={nodeAction}>
              <i className='expand-image'/>
              <div className='pair-order'>
                <label className='label-box' onClick={setElement}>
                  { node.name }
                </label>
                {hierarchyEditPermissions.includes(user.role) &&
                <div className='button-box'>
                  <button className='small-button add-button' title='Agregar elemento' onClick={addElement}/>
                </div>
                }
              </div>
            </li>
            <ul className='item-container-box'/>
          </div>
        )
    )
  }

  return (
    <ul>
      <Expander index='0'/>
    </ul>
  )
}