import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import action from './redux/action/index';
import HN from './components/HierarchyNavigation'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action.tree.getData())
  }, [])
    
  return (
    <HN/>
  );
}