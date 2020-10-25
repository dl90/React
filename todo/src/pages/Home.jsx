import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Form from '../components/Form'
import FilterButton from '../components/FilterButton'
import Todo from '../components/Todo'
import Button from '../components/Button'

/*
  defining these constants outside our App() avoids reevaluating every time <App /> re-renders
  these data are not meant to be changed
*/
const FILTER_MAP = {
  All: () => true,
  NotStarted: task => task.status === 0,
  Started: task => task.status === 1,
  Completed: task => task.status === 2
}
const FILTER_NAMES = Object.keys(FILTER_MAP)
const DATA = [
  // { id: `todo-${nanoid()}`, name: 'Eat', status: 0 },
  // { id: `todo-${nanoid()}`, name: 'Sleep', status: 0 },
  // { id: `todo-${nanoid()}`, name: 'Repeat', status: 0 }
]

export default function Home () {
  const [tasks, setTasks] = useState(DATA)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'))
    if (localTasks) setTasks(localTasks)
  }, [])
  useEffect(() => window.localStorage.setItem('tasks', JSON.stringify(tasks)), [tasks])

  /*
    callback prop: function passed as a prop to grab/process values from sub-components
    naming convention for the prop: <onSomething>, function <whatItDoes>
  */

  // updates tasks after toggle
  const toggleTaskStatus = (id, val) => {
    setTasks(tasks.map(task => {
      if (id === task.id) return { ...task, status: parseInt(val) }
      return task
    }))
  }

  // updates existing after edit
  const editTask = (id, newName) => {
    setTasks(tasks.map(task => {
      if (id === task.id) return { ...task, name: newName }
      return task
    }))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => id !== task.id))
  }

  // builds Todo based on filter
  const taskList = tasks
    .filter(task => FILTER_MAP[filter](task))
    .map(task =>
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        status={task.status}
        onToggleStatus={toggleTaskStatus}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    )

  // builds FilterButton
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const addTask = (name) => {
    setTasks([...tasks, {
      id: `todo-${nanoid()}`,
      name,
      status: 0,
      completed: false
    }])
  }

  const clearTasks = () => {
    window.localStorage.clear()
    setTasks([])
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  return (
    <div>
      <h1><span role='img' aria-label='tic-toc'>💣💥🏁</span></h1>
      <Form onSubmit={addTask} />
      <div className='btn-group'>
        <Button name='Clear All' onClick={clearTasks} className='btn btn__danger' />
      </div>
      <div className='filters btn-group stack-exception'>
        {filterList}
      </div>
      <h2 id='list-heading'>{headingText}</h2>
      <ul
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  )
}
