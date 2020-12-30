import React, {useState, useEffect} from 'react'
import { Router, Route, Link, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import { createBrowserHistory } from 'history'
import { useDispatch } from 'react-redux'
import action from './redux/action/index'

import Login from './components/Login'
import Home from './components/Home'
import Organization from './components/HierarchyNavigation'
import Report from './components/Report'

import './Common.css'
import './components/Navbar.css'

export default function App() {
  const [history, setHistory] = useState(createBrowserHistory())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action.tree.getData())
  }, [])

    
  return (

      <Router history={history}>
        <div>
          {true &&
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
                  <a href='/report' className="navbar-item">Reportes</a>
                  </li>
                </ol>
              </nav>
            </header>
          }
          <div className="container">
            <Route path='/' render={() => {
              return (<Redirect to='/login'/>)
            }}/>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/organization" component={Organization} />
            <PrivateRoute exact path="/report" component={Report} />
          </div>
        </div>
      </Router>
  )
}