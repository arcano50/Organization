import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import { useDispatch, useSelector} from 'react-redux'
import action from '../redux/action/index'
import './HierarchyNavigation.css'

// eslint-disable-next-line
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
    // eslint-disable-next-line
    while ((id = path.shift()) !== undefined && node.childrenCollection !== null)
      // eslint-disable-next-line
      node = node.childrenCollection.find(children => children.id == id)
    return node
  }

  const nodeAction = ( node ) => {
    let item = node.target
    while (!item.classList.contains('item-box'))
      item = item.parentNode
    let parent = item.parentNode
    
    if (item.classList.contains('expanded')){
      parent.removeChild(parent.lastChild)
      parent.appendChild(document.createElement('ul'))
    }
    else{
      let index = item.getAttribute('index')
      ReactDOM.render(<Expander index={index}/>, parent.lastChild)
    }
    item.classList.toggle('expanded')
  }

  const setElement = ( current ) => {
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

  const Expander = ( { index } ) => {
    let level = searchElement(index)
    if (level === {})
      return null
    return (
      level.childrenCollection === undefined ? null :
      level.childrenCollection === null || level.childrenCollection.length === 0 ?
      <li className='default-item'>
        <label>&lt; No hay elementos &gt; </label>
      </li>
      :
        level.childrenCollection.map( node =>
          <div>
            <li className='item-hierarchy-box item-box'
              index={index + '.' + node.id} onClick={nodeAction}>
              <i className='expand-image'/>
              <div className='pair-order'>
                <label className='label-box' onClick={setElement}>
                  { node.name }
                </label>
                <div className='button-box'>
                  <button className='small-button add-button' title='Agregar elemento' onClick={nodeAction}/>
                </div>
              </div>
            </li>
            <ul/>
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