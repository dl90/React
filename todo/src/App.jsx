import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import Todo from './components/Todo'

/*
  defining these constants outside our App() avoids reevaluating every time <App /> re-renders
  these data are not meant to be changed
*/
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}
const FILTER_NAMES = Object.keys(FILTER_MAP)

function App (props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')

  /*
    callback prop: function passed as a prop to grab/process values from sub-components
    naming convention for the prop: <onSomething>, function: <whatItDoes>
  */

  // updates tasks (state) after toggle
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) return { ...task, completed: !task.completed }
      return task
    })
    setTasks(updatedTasks)
  }

  // updates after delete
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }

  // updates existing after edit
  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) return { ...task, name: newName }
      return task
    })
    setTasks(editedTaskList)
  }

  // builds Todo based on filter
  const taskList = tasks
    .filter(task => FILTER_MAP[filter](task))
    .map(task =>
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        completed={task.completed}
        onComplete={toggleTaskCompleted}
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

  // adds new task to task arr
  const addTask = (name) => {
    setTasks([...tasks, {
      id: `todo-${nanoid()}`,
      name,
      completed: false
    }])
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  return (
    <div className='todoapp stack-large'>
      <h1><span role='img' aria-label='tic-toc'>💣💣💥</span></h1>
      <Form onSubmit={addTask} />
      <div className='filters btn-group stack-exception'>
        {filterList}
      </div>
      <h2 id='list-heading'>{headingText}</h2>
      <ul
        // role='list'
        className='todo-list stack-large stack-exception'
        aria-labelledby='list-heading'
      >
        {taskList}
      </ul>
    </div>
  )
}

export default App
