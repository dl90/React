import React from 'react'
import { fireEvent, render, cleanup } from '@testing-library/react'
import FilterButton from './FilterButton'

let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(cleanup)

describe('FilterButton tests', () => {
  test('FilterButton', () => {
    const mock = jest.fn()
    const props = {
      name: 'test',
      isPressed: false,
      setFilter: mock
    }
    const { getByTestId, getByRole } = render(<FilterButton {...props} />, container)
    const button = getByRole('button')
    expect(getByTestId('filterButtonName').textContent).toBe(props.name)

    fireEvent.click(button)
    expect(mock).toHaveBeenCalled()
  })
})
