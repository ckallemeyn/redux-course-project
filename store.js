


// an action is an event that will update the store. Example:
{
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  }
}

{
  type: 'REMOVE_TODO',
  id: 0,
}

{
  type: 'TOGGLE_TODO',
  id: 0,
}

{
  type: 'ADD_GOAL',
  goal: {
    id: 0,
    name: 'Run a Marathon'
  }
}

{
  type: 'REMOVE_GOAL',
  goal: {
    id: 0,
    name: 'Run a Marathon'
  }
}

/*
Characteristics of a Pure Function
1. They always return the same result if the same arguments are passied in.
2. They depend only on the args passed into them.
3. Never produce any side effects(i.e. no AJAX requests, doesn't modify state)
*/


//------The Store------
// Library Code
function createStore(reducer) {
// 1. The State
// 2. Get the state.
// 3. Listen to changes on the state.
// 4. Update the state
let state
//create an array of callback funcs
let listeners = []

const getState = () => state;

const subscribe = (listener) => {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

const dispatch = (action) => {
  // call todos (reducer)
  state = reducer(state, action)

  // iterate through listeners and invoke them
  listeners.forEach((listener) => listener())
}

  return {
    getState,
    subscribe,
    dispatch,
  }
}
// -----END OF STORE-----

// App Code
// -------Reducers--------
function todos(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo]);
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return state.map((todo) => (action.id !== todo.id) ? todo : Object.assign({}, todo, {complete: !todo.complete}));
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch(action.type) {
    case 'ADD_GOAL' :
      return state.concat([action.goal]);
    case 'REMOVE_GOAL' :
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const TOGGLE_GOAL = 'TOGGLE_GOAL';

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

function toggleGoalAction(id) {
  return {
    type: TOGGLE_GOAL,
    id,
  }
}

const store = createStore(app)

store.subscribe(() => console.log('The new state is: ', store.getState()));

store.dispatch(addTodoAction({
   id: 0,
   name: 'Make Dinner',
   complete: false,
}));

store.dispatch(addTodoAction({
  id: 1,
  name: 'exercise',
  complete: true,
}));

store.dispatch(addTodoAction({
  id: 2,
  name: 'Wash dishes',
  complete: true,
}));

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}));

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose 20 pounds'
}));

store.dispatch(removeGoalAction(0))

// DOM code
function addTodo() {
  const input = document.getElementById('todo');
  const name = input.value
  input.value = ''
}

function addGoal() {
  const input = document.getElementById('goal');
  const name = input.value
  input.value = ''
}