import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './layout/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import ErrorPage from './pages/ErrorPage'
import Api from './pages/Api'

export default function App () {
  const LINKS = {
    home: '/',
    about: '/about',
    api: '/api'
  }
  return (
    <main className='todoapp stack-large'>
      <BrowserRouter>
        <Navbar {...LINKS} />
        <Switch>
          <Route path={LINKS.home} component={Home} exact />
          <Route path={LINKS.about} component={About} />
          <Route path={LINKS.api} component={Api} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </main>
  )
}
