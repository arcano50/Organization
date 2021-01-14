import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: Component, ...rest }) => {
  const currentUser = useSelector(({ user }) => user)
  
  return (
    <Route { ...rest } render =
      { props => {
        console.log(currentUser)
        if (!currentUser){
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        return <Component { ...props } />
    }} />
  )
}