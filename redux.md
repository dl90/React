# Redux

large number/diverse kinds of state are tracked [ajax, local, UI]

Redux manages global app state, offers one source of truth for state, controls how/when state updates happen

## principle

> 1 way dataflow architecture

1. single source of truth
   * global state stored in a single store
   * changed through pure functions
   * easier to serialize and debug

1. state is readonly
   * emitting actions (obj with change)
   * dispatch: calls to update state with action
   * ensures view/network never directly write to state

1. changes applied with pure functions
   * reducer function takes in previous state and action and returns next state

### use case

* many application states, used by many components
* state frequently updates
* complex update logic
* bigger codebase with multiple developers

> redux all state? local state for UI + redux for app state is best

can be used with Angular/Vue

### immutability

redux expects all updates are done immutably, so returned updated store state must be copied from original + any changes

### redux store

where state is saved

```js
store.getState()
```

* single store enables Redux DevTools, simpler logic
* store can be divided to parts to handle performance issues caused by frequent updates to a few particular states
* another case for multiple stores is if you want to isolate a Redux app to a component, which is part of a larger app

### action

* JS object with type field (type: 'todoAdd') used to describe an event
* payload field describes what happened

```js
const addTodoAction = {
  type: 'todoAdd'.
  payload: 'todo task'
}
```

### action creator

* function that returns an action object
* does not dispatch action

### dispatch

```js
store.dispatch(actionObj)
```

* 'triggers an event', tells store to update state
* reducers in store act like event listeners and calls function based on action type

### reducers

* pure function, takes in stored state and an action and returns new stored state
* components become decoupled from data changes
* reducer composition
  * small/reuseable reducer functions
  * handles specific parts of state
  * based on specific triggers
  * may/may not be triggered by an action

### sharing state between 2 reducers

* combineReducer

## redux data flow

1. initial setup
   * Redux store created with root reducer function
   * store calls root reducer once and saves returned state
   * components initial render uses Redux store state
   * components checks with Redux store for changes/updates
2. updates
   * component dispatches an action to Redux store
   * Redux store calls reducer with previous state and action, returns new state
   * Redux store notifies all 'subscribed' components of change
   * 'subscribed' components check if their consumed state is changed
   * component that sees change will re-render
