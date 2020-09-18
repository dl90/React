import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'

async function fetch () {
  try {
    const res = await window.fetch('http://jsonplaceholder.typicode.com/users/1')
    const data = await res.json()
    return data
  } catch (err) {
    console.err(err.message)
  }
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
