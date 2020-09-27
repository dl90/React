import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App from './App'

const DATA = [
  { id: `test-1`, name: 'Eat', completed: true },
  { id: `test-2`, name: 'Sleep', completed: false },
  { id: `test-3`, name: 'Repeat', completed: false }
]

describe('main', () => {
  test('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App tasks={DATA} />, div)
  })

  test('snapShot', () => {
    const component = renderer.create(<App tasks={DATA} />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })
})
