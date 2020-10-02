import React from 'react'
import ReactDOM from 'react-dom'
// import { nanoid } from 'nanoid'
import './index.css'
import App from './App'

const DATA = [
  // { id: `todo-${nanoid()}`, name: 'Eat', completed: true },
  // { id: `todo-${nanoid()}`, name: 'Sleep', completed: false },
  // { id: `todo-${nanoid()}`, name: 'Repeat', completed: false }
]

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
)
