# React Router

conditionally renders components based on route

```bash
npm install react-router-dom
```

```jsx
import React from 'react'
import { BrowserRoute, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Error from './component/Error.jsx'

// exact attribute b/c '/' also include '/about'
function App (props) {
  return (
    <div>
      <Navbar home='/' about='/about'>
      <Switch>
        <Route path='/' component={Home(props)} exact />
        <Route path='/about' component={About(props)} />
        <Route component={Error} />
      </Switch>
    </div>
  )
}
```

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar (props) {
  const { home, about } = props
  return (
    <div>
      <Link to={home}>Home</Link>
      <Link to={about}>About</Link>
    </div>
  )
}
```
