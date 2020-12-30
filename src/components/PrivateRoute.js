import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, roles, ...rest }) => (
  <Route { ...rest } render =
    { props => {
      const currentUser = {};
      if (!currentUser)
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      if (roles && roles.indexOf(currentUser.role) === -1)
          return <Redirect to={{ pathname: '/'}} />
      return <Component { ...props } />
  }} />
)