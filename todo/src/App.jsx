import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './layout/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'

export default function App () {
  const LINKS = {
    home: '/',
    about: '/about'
  }
  return (
    <main className='todoapp stack-large'>
      <BrowserRouter>
        <Navbar {...LINKS} />
        <Switch>
          <Route path={LINKS.home} component={Home} exact />
          <Route path={LINKS.about} component={About} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </main>
  )
}
