# Testing

code becomes more complex as project grows

writing tests before coding ensures tests are written and it may be difficult to write tests after writing code

## Jest

>Files with .js suffix in __tests__ folders
>
>Files with .test.js suffix
>
>Files with .spec.js suffix

### Arrays

```js
test('test statement', () => {
  const arr = [3]
  const test = [1, 2, 3]
  // expect test to contain items of arr
  expect(test).toEqual(expect.arrayContaining(arr))
})
```

### Objects

```js
test('test statement', () => {
  const test = { name: 'a' }
  expect(test).toHaveProperty('name')
  expect(test).toHaveProperty('name', 'a')
})
```

### Describe

organize tests to blocks for better reports

```js
describe('block description', () => {
  test('1', () => { null })
  test('2', () => { null })
  test('3', () => { null })
  test('4', () => { null })
})
/*
  while jest --watch
  test results are grouped by blocks when 'p' fileName (regex) is issued
*/
```

---

## Component Testing

* smoke test: render errors
* shallow: render only base level of component, excluding children
* full: component lifecycle + state

### Snapshot

used to test components for change, this is done by rendering component to a JSON 'snapshot' and comparing it against subsequent renders for change

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import Component from './components/component'

const testProp = {
  id: 1,
  name: 'test',
  email: 'test@t.t'
}

test('test statement', () => {
  const component = renderer.create(<Component user={testProp}/>) // render component
  const componentJSON = component.toJSON()
  expect(componentJSON).toMatchSnapshot()
  /*
    initial run saves snapshot
    subsequent runs will fail if any changes to the component are found when compared to snapshot
    this is used to check if modifying parts of the code also unintentionally changes parts of component
    update snapshot with 'u' (jest --watch)

    @NOTE if the component needs props to property render, the test will also need props to pass
    this can be done by passing an object with the same structure as what is passed as props to the component
  */
})

```

### Function calls

jest.fn() is passed as a cb to check if the cb is indeed called

```jsx
function drinkAll(callback, flavour) {
  if (flavour !== 'octopus') {
    callback(flavour)
  }
}

test('does not drink something octopus-flavoured', () => {
  const drink = jest.fn()
  drinkAll(drink, 'octopus')
  expect(drink).not.toHaveBeenCalled()
})
```

### Simulating ui actions

```jsx
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
```
