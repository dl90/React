# Context

* state data can be inherited by the component's children through props
* problem exists if a distant component also needs the states 'data'
* context is the alternative to elevating state to the top level component (passing through props) aka '**_prop drilling_**'

context provides a way of passing data to different components through a '**Provider-Consumer**' relationship, skipping the need for passing state data via props

```jsx
import React from 'react'
import Toolbar from './components/Toolbar.jsx'

const ThemeContext = React.createContext('light')
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value='dark'>
        <Toolbar />
      <ThemeContext.Provider />
    )
  }
}
```

```jsx
import React from 'react'
import ThemeButton from './components/ThemeButton.jsx'

export default function Toolbar () {
  return (
    <div>
      <ThemeButton />
    </div>
  )
}
```

```jsx
import React from 'react'

export default function ThemeButton () {
  // react finds/uses the closest ThemeContext from parent components
  const contextType = ThemeContext
  return (
    <button theme={contextType} />
  )
}
```

## Considerations

* context should be used when data is needed by many components at different nesting levels
* **makes component reuse more difficult**
* component composition (importing components to components) for specific use may be easier than context

### caveats

* don't use context to avoid **_prop drilling_** down only a few layers (prop drilling is faster)
* don't use context to save state meant to be kept locally

### _inversion of control_

* reduces number of props passed down but adds complexity to root component
* not ideal for all cases, specific use depends on scenario

```jsx
import React from 'react'
import PageLayout from './components/PageLayout.jsx'
import Avatar from './components/Avatar.jsx'
import Link from './components/Link.jsx'

function Page (props) {
  const { user, avatarSize, permalink } = props
  const userLink = (
    <Link href={permalink}>
      <Avatar user={user} size={avatarSize} />
    </Link>
  )

  /*
    explicitly passing {userLink} which consumes {user} and {avatarSize}
    children of PageLayout will not need to know/pass {user} and {avatarSize}, only {userLink}
  */
  return (
    <PageLayout userLink={userLink} />
  )
}
```
