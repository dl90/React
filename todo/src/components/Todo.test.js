import React from 'react'
import { fireEvent, render, cleanup } from '@testing-library/react'
import Todo from './Todo'

let container
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(cleanup)

const onCompleteCB = jest.fn()
const onDeleteCB = jest.fn()
const onEditCB = jest.fn()
const props = {
  id: '123',
  completed: true,
  name: 'test',
  onComplete: onCompleteCB,
  onDelete: onDeleteCB,
  onEdit: onEditCB
}

describe('Todo', () => {
  test('complete and delete', () => {
    const { getByTestId, getByRole } = render(<Todo {...props} />, container)
    const checkbox = getByRole('checkbox')
    const deleteButton = getByTestId('todoDelete')

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(!props.completed)
    expect(onCompleteCB).toHaveBeenCalled()

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(props.completed)
    expect(onCompleteCB).toHaveBeenCalledTimes(2)

    fireEvent.click(deleteButton)
    expect(onDeleteCB).toHaveBeenCalled()
  })

  test('edit', () => {
    const { getByTestId, getByRole } = render(<Todo {...props} />, container)
    const startEditButton = getByTestId('todoStartEdit')
    fireEvent.click(startEditButton)

    const textbox = getByRole('textbox')
    const cancelButton = getByTestId('todoEditCancel')
    const editSubmit = getByTestId('todoEditSubmit')

    const val = 'changed'
    fireEvent.change(textbox, { target: { value: val } })
    expect(textbox.value).toBe(val)

    fireEvent.click(cancelButton)
    // console.log(textbox.value)
    // expect(textbox.value).toBe('')
    fireEvent.click(startEditButton)

    fireEvent.click(editSubmit)
    expect(onEditCB).not.toHaveBeenCalled()
  })
})
