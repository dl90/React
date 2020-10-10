/* global describe test expect */

import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App from './App'

describe('main', () => {
  test('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  test('snapShot', () => {
    const component = renderer.create(<App />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })
})
