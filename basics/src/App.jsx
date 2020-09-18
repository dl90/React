import React from 'react'
import logo from './logo.svg'
import './App.css'

function App (props) {
  const { name, email, ...others } = props.data
  props.children(others)

  let message
  (!name || !email)
    ? message = 'Ran into an error'
    : message = `Hello ${name}`

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>
          {message}
        </h1>
        {email ?? ''}
      </header>

      <ListOfTenThings />
    </div>
  )
}

// Calls the children callback numTimes to produce a repeated component
function Repeat (props) {
  const items = []
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i))
  }
  return <div>{items}</div>
}

function ListOfTenThings () {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index + 1}>This is item {index + 1} in the list</div>}
    </Repeat>
  )
}

/* component class declaration */
// class App extends React.Component {
//   render () {
//     const { name, email } = this.props.data

//     return (
//       <div className='App'>
//         <header className='App-header'>
//           <img src={logo} className='App-logo' alt='logo' />
//           <h1>
//             Hello {name}
//           </h1>
//           {email}
//         </header>
//       </div>
//     )
//   }
// }

export { App }
