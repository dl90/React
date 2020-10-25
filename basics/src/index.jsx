import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'

async function fetch () {
  const res = await window.fetch('http://jsonplaceholder.typicode.com/users/1')
  return await res.json()
}

function render (data) {
  ReactDOM.render(
    <React.StrictMode>
      <App data={data}>
        {(arg) => console.dir(arg)}
      </App>
    </React.StrictMode>,
    document.querySelector('#root')
  )
}

fetch().then(data => render(data))
