import React, {useState, useEffect} from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { useDispatch, useSelector } from 'react-redux'

import PrivateRoute from './components/PrivateRoute'
import action from './redux/action/index'
import { authenticationService } from './services/ComunityServices'
import { Roles } from './components/Utils'

import Login from './components/Login'
import Home from './components/Home'
import Organization from './components/HierarchyNavigation'
import Report from './components/Report'
import News from './components/News'
import CCG from './components/CCG'

import './Common.css'
import './components/Navbar.css'

const newsPostingPermissions = [Roles.ADMIN, Roles.LEADER]
const history = createBrowserHistory()

export default () => {
  const user = useSelector(({user}) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action.tree.getData())
    dispatch( action.user.setUser(JSON.parse(localStorage.getItem('user'))) )
  }, [])

  useEffect(() => {
    if (user?.logged) localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const signOut = () => {
    localStorage.removeItem('user')
    dispatch( action.user.setUser(null) )
    history.replace('/')
  }
    
  return (
    <Router history={history}>
      <div>
        {user &&
          <header className='header'>
            <nav className='navbar'>
              <ol>
                <li>
                  <a href="/home" className="navbar-item">Inicio</a>
                </li>
                <li>
                  <a href="/organization" className="navbar-item">Organización</a>
                </li>
                <li>
                <a href='/report' className="navbar-item">Aportes</a>
                </li>
              </ol>
              <ol className='right-navbar'>
                {newsPostingPermissions.includes(user.role)  &&
                  <button onClick={() => dispatch( action.news.setVisibility(true) )}
                    className='attrative-button add-news'>Noticia</button>
                }
                <button onClick={() => dispatch( action.ccg.setVisibility(true) )}
                  className='attrative-button add-ccg'>Aporte</button>
                <button onClick={signOut}
                  className='attrative-button sign-out'>Salir</button>
              </ol>
            </nav>
          </header>
        }
        <div className="container">
            <Route exact path='/' render={user => user && user.logged ?
              <Redirect to='/home'/>
              :
              <Redirect to='/login'/>
            }/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/organization" component={Organization} />
            <PrivateRoute exact path="/report" component={Report} />
        </div>
      </div>
      <News/>
      <CCG/>
    </Router>
  )
}