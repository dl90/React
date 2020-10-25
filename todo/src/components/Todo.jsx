import React, { useState } from 'react'

export default function Todo (props) {
  const { id, status, name, onToggleStatus, onDelete, onEdit } = props
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')

  const handleChange = (e) => setNewName(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName.trim().length) {
      onEdit(id, newName.trim())
      setNewName('')
      setEditing(false)
    }
  }

  // const statusState = (status) => {
  //   switch (status) {
  //     case 0:
  //       return 'Not Started'
  //     case 1:
  //       return 'Started'
  //     case 2:
  //       return 'Completed'
  //   }
  // }

  const editingTemplate = (
    <form
      className='stack-small'
      onSubmit={handleSubmit}
    >
      <div className='form-group'>
        <label className='todo-label' htmlFor={id}>
          New name for {name}
        </label>

        <input
          id={id}
          className='todo-text'
          type='text'
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className='btn-group'>

        <button
          type='button'
          className='btn todo-cancel'
          onClick={() => { setEditing(false); setNewName('') }}
          data-testid='todoEditCancel'
        >Cancel
          <span className='visually-hidden'> renaming {name}</span>
        </button>

        <button
          type='submit'
          className='btn btn__primary todo-edit'
          data-testid='todoEditSubmit'
        >Save
          <span className='visually-hidden'> new name for {name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>

        <div className='status-container'>
          {/* <label htmlFor='status'>{statusState(status)}</label> */}
          <select name='status' id={id} onChange={(e) => onToggleStatus(id, e.target.value)} value={status}>
            <option value='0'>Not started</option>
            <option value='1'>Started</option>
            <option value='2'>Completed</option>
          </select>

          {/* <input type='radio' name='NotStarted' onClick={() => onToggleStatus(id, 0)} />
          <label htmlFor='NotStarted'> Not started</label>
          <input type='radio' name='Started' onClick={() => onToggleStatus(id, 1)} />
          <label htmlFor='Started'> Started</label>
          <input type='radio' name='Completed' onClick={() => onToggleStatus(id, 2)} />
          <label htmlFor='Completed'> Completed</label> */}
        </div>

        <label className='todo-label' htmlFor={id}>{name}</label>
      </div>
      <div className='btn-group'>

        <button
          type='button'
          className='btn'
          onClick={() => setEditing(true)}
          data-testid='todoStartEdit'
        >Edit
          <span className='visually-hidden'>{name}</span>
        </button>

        <button
          type='button'
          className='btn btn__danger'
          onClick={() => onDelete(id)}
          data-testid='todoDelete'
        >Delete
          <span className='visually-hidden'>{name}</span>
        </button>

      </div>
    </div>
  )

  return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>
}
