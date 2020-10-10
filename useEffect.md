# useEffect

* used on components to trigger an action after theres been a change
* usually placed in a component to access the components state, to trigger an action based on state data
* by default useEffect hook is called after every render

```jsx
// Hooks must be called on the top level of our components.
// If we want to run an effect conditionally, we can put that condition inside our Hook:

useEffect(() => {
    if (name !== '') localStorage.setItem('formData', name)
  })
```

```jsx
// hooks/any functions within the component are affected by closure
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`)
    }, 3000)
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

// class components are not
class Counter extends React.Component {
  constructor () {
    this.state = { count : 0}
  }

  // called after mount
  componentDidMount() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`)
    }, 3000)
  }

  // called on each render after initial render
  componentDidUpdate() {
    const count = this.state.count /* but this will create closure */
    setTimeout(() => {
      console.log(`You clicked ${count} times`)
      console.log(`You clicked ${this.state.count} times`)
    }, 3000)
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>
          Click me
        </button>
      </div>
    )
  }
}
```
