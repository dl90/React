# React notes

```bash
  npx create-react-app <name>
```

React uses one way data flow (parent component to sub-component)

## composing components

* a component should ideally only do one thing
* complex components should be decomposed into smaller sub-components
* the Welcome component can be reused to compose more complex components

```jsx
const Welcome = (props) => {
  const { name } = props
  return (<h1>Hello, {name}</h1>)
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

## extracting components

complex components should be broken down (to a certain extent) if it benefits reusability and clarity

```jsx
/* original */
function Comment (props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  )
}
```

```jsx
/* third component: takes <props.user> and renders data */
function Avatar (props) {
  const { avatarUrl, name } = props.user
  return (
    <img className="Avatar"
      src={avatarUrl}
      alt={name}
    />
  )
}

/* secondary component: takes <props.user> passes to Avatar as <user> attribute */
function UserInfo (props) {
  const { name } = props.user
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {name}
      </div>
    </div>
  )
}

/* main component: passes <props.author> to UserInfo as <user> attribute */
function Comment (props) {
  const { date, text, author} = props
  return (
    <div className="Comment">
      <UserInfo user={author} />
      <div className="Comment-text">
        {text}
      </div>
      <div className="Comment-date">
        {formatDate(date)}
      </div>
    </div>
  )
}
```

---

## [JSX](https://babeljs.io/repl)

```jsx
// self closing tags (when there are not children)
const div = <div className="sidebar" />

const div = /*#__PURE__*/React.createElement(
  "div", // tag (type) of component
  { className: "sidebar" } // props data / tag/component attribute
  // children if any
);
```

> *Note:*
>
> Capitalized types indicate JSX tag is referring to a React component.
>
> These tags get compiled into a direct reference to the named variable and must be in scope.

```jsx
// both React and CustomButton are in scope (imported) and used by React.createElement
import React from 'react'
import CustomButton from './CustomButton'

function WarningButton () {
  // return React.createElement(CustomButton, {color: 'red'}, null)
  return <CustomButton color="red" />
}
```

```jsx
import React from 'react'

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>
  },
  WarningButton: function WarningButton(props) {
  return <CustomButton color="red" />
  }
}

function BlueDatePicker () {
  // OK to use specific component from a object containing these components
  return <MyComponents.DatePicker color="blue" />
}
```

```jsx
// This comes up when you want to render a different component based on a prop
import React from 'react'
import { PhotoStory, VideoStory } from './stories'

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story (props) {
  // JSX type can't be an expression
  // return <components[props.storyType] story={props.story} />;

  // JSX type can be a capitalized variable referencing an expression.
  const SpecificStory = components[props.storyType]
  return <SpecificStory story={props.story} />
}
```

> *Note:*
>
> JSX is not required to use React (if you don't want compilation), React can be used with pure JavaScript

```jsx
class Hello extends React.Component {
  render () { return <div>Hello {this.props.toWhat}</div> }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
)

/* ---------------------------- */

/* is the same as (pure JS)*/
class Hello extends React.Component {
  render() { return React.createElement('div', null, `Hello ${this.props.toWhat}`) }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);

/* ---------------------------- */

/* assign a ref to simplify */
const e = React.createElement;
ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```

---

## Props

* JS expressions can be passed as props.

  if statements and for loops are not expressions, but can be evaluated prior

```jsx
// props.foo = 3
<MyComponent foo={1 + 2} />

function NumberDescriber(props) {
  let description
  (props.number % 2 == 0)
    ? description = <strong>even</strong>
    : description = <i>odd</i>

  return <div>{props.number} is an {description} number</div>
}
```

* When you pass a string literal, its value is [HTML-unescaped](https://stackoverflow.com/questions/20727910/what-is-escaped-unescaped-output)

```jsx
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

* If you pass no value for a prop, it defaults to true

  > *Note:*
  >
  > this can be confused with the ES6 object shorthand ( {foo} => {foo: foo} ) so avoid if possible

```jsx
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

* Can use spread operator to pass multiple attributes to props

  *Note:* easy to pass unnecessary props to components or invalid HTML attributes, use sparingly

```jsx
function App1 () {
  return <Greeting firstName="Ben" lastName="Hector" />
}

function App2 () {
  const props = {firstName: 'Ben', lastName: 'Hector'}
  return <Greeting {...props} />
}

// {kind} is consumed by the component and {other} (refering to onClick and children (Hello World!) ) is passed
const Button = props => {
  const { kind, ...other } = props
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton"
  return <button className={className} {...other} />
}

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  )
}
```

---

## JSX children

content between tags is passed as props.children

* string literals with HTML unescaped

```jsx
<MyComponent>Hello world!</MyComponent>
<div>This is valid HTML &amp; JSX at the same time.</div>
```

* JSX elements

```jsx
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

* array of elements

```jsx
function Render () {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ]
}

function Container () {
  return (
    <div>
      <ul>
        <Render/>
      </ul>
    </div>
  )
}
```

* expression

```jsx
// text content of each Item component comes from the message attribute (message={message})
function Item (props) {
  return <li>{props.message}</li>;
}

function TodoList () {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message, idx) => <Item key={idx} message={message} />)}
    </ul>
  );
}

function Hello (props) {
  return <div>Hello {props.addressee}!</div>;
}
```

* functions

```jsx
// Calls the children callback numTimes to produce a repeated component
function Repeat (props) {
  const items = []
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i))
  }
  return <div>{items}</div>
}

// props.children refers to everything between <Repeat>{}</Repeat>
// in this case its a anonymous function that returns an element
function ListOfTenThings () {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  )
}
```

* boolean, null, undefined

```jsx
// not rendered but can be used for conditionals
<div>
  {showHeader && <Header />}
  <Content />
</div>

// falsy values (0) will be rendered unless coerced to an boolean
<div>
  {props.messages.length > 0 && <MessageList messages={props.messages} />}
</div>

// force rendering boolean/null/undefined by type casting
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```
