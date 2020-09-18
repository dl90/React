# Handling events

1. React events are named using camelCase and pass a function rather than string

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

1. Returning false does not prevent default behavior in Reacts, preventDefault need to be called explicitly

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault()
    console.log('The link was clicked.')
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  )
}
```

> *Note:*
>
> React events do not work exactly the same as native events but adheres to W3C standards, see [Synthetic Events](https://reactjs.org/docs/events.html)
>
> Generally don't need to attach an addEventListener to catch events

## State

Components defined as a class commonly call its method to handel events

setState method inherited from React.Components

state is private and encapsulated by the component

by using state, React will preserved values in function components between re-renders

```jsx
class Toggle extends React.Component {
  constructor(props) {
    // props passed to React.Component
    super(props)
    this.state = {isToggleOn: true}

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  /* method handler */
  handleClick() {
    this.setState(state => ({ isToggleOn: !state.isToggleOn }))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
)
```

or use public class field syntax

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isToggleOn: true}
  }

  /* public class field handler */
  handleClick = () => {
    this.setState(state => ({ isToggleOn: !state.isToggleOn }))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
)
```

> *Note:*
>
> *state* and props may be updated asynchronously
>
> use the cb form to calculate new state (based on current state and the props at the time)

```jsx
this.setState((state, props) => ({ counter: state.counter + props.increment }))
```

> *Note:*
>
> class component state updates using this.setState() merges objects

```jsx
 constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }

  /*
    merge is shallow
    this.setState({comments}) leaves this.state.posts, but reassigns this.state.comments
  */
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

## State using hooks

**hooks** allow you to use React features

**useState** is a hook that allows the use *state* without building/converting components as a class

> *Note:*
>
> props should be the primary source of component data, state is meant for interactions
>
> Hooks don't work in React class components
>
> only change *state* with this.setState or the setState reference from useState()

### checklist for using state

* Is it passed in from a parent via props? If so, it probably isn’t state.

* Does it remain unchanged over time? If so, it probably isn’t state.

* Can you compute it based on any other state or props in your component? If so, it isn’t state.

```jsx
import React, { useState } from 'react'

function Example() {
  /*
    Declare a new state variable, which we'll call "count"
    initialized as 0 with setCount as a reference, bound to the method for applying change

    multiple values require multiple useState
    you can also set state variables as objects/arrays to hold related data
    Note: updating a state variable always replaces it

    the state variable can be referenced directly
    <p>You clicked {count} times</p>
    <p>You clicked {unused.thing1} times</p>
  */
  const [count, setCount] = useState(0)
  const [unused, setUnused] = useState({ thing1: 1, thing2: 'abc' })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

## Lifecycle

free up resources taken by the components when they are destroyed

“mounting” is when the component is rendered to the DOM for the first time

“unmounting” is when the component is removed from the DOM

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
  }

  /*
    'lifecycle methods'
    componentDidMount() is called after the component 'mounted'
    componentWillUnmount() is called to clears a timer set with setInterval() when the Clock component is removed from the DOM
  */
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  // updates state every call
  tick() {
    this.setState({ date: new Date() })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
```
