import React from 'react'
import { fireEvent, render, cleanup } from '@testing-library/react'
import Form from './Form'

let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(cleanup)

describe('form', () => {
  test('functionality', () => {
    const mock = jest.fn()
    const { getByTestId, getByRole } = render(<Form onSubmit={mock} />, container)
    const form = getByTestId('form')
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: '' } })
    fireEvent.submit(form)
    expect(mock).not.toHaveBeenCalled()

    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')

    fireEvent.submit(form)
    expect(mock).toHaveBeenCalled()

    expect(input.value).toBe('')
  })
})
