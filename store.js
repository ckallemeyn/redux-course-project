/*
Characteristics of a Pure Function
1. They always return the same result if the same arguments are passied in.
2. They depend only on the args passed into them.
3. Never produce any side effects(i.e. no AJAX requests, doesn't modify state)
*/

function generateId () {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
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

const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().indexOf('bitcoin') !== -1
  ) {
    return alert("Nope. That's a bad idea.")
  }
  if (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().indexOf('bitcoin') !== -1
  ) {
    return alert("Nope. That's a bad idea.")
  }
  return next(action)
}

const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('The action: ', action);
  const result = next(action);
  console.log('The new state: ',store.getState());
  console.groupEnd();
  return result;
}

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

const store = Redux.createStore(Redux.combineReducers({
  todos,
  goals,
}), Redux.applyMiddleware(checker, logger));

store.subscribe(() => {
  const { goals, todos } = store.getState();

  document.getElementById('goals').innerHTML = '';
  document.getElementById('todos').innerHTML = '';
  todos.forEach(addTodoToDom)
  goals.forEach(addGoalToDom)
  console.log('goals', goals);
  console.log('todos', todos);
});


// DOM code
function createRemoveButton(onClick) {
  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = 'X';
  removeBtn.addEventListener('click', onClick);

  return removeBtn;
}


function addTodo() {
  const input = document.getElementById('todo');
  const name = input.value
  input.value = ''

  store.dispatch(addTodoAction({
    id: generateId(),
    name,
    complete: false,
  }));
}

function addGoal() {
  const input = document.getElementById('goal');
  const name = input.value
  input.value = ''

  store.dispatch(addGoalAction({
    id: generateId(),
    name,
  }));
}

  document.getElementById('todoBtn')
    .addEventListener('click', addTodo);

  document.getElementById('goalBtn')
    .addEventListener('click', addGoal);

function addTodoToDom(todo) {
  const node = document.createElement('li')
  const text = document.createTextNode(todo.name);

  const removeBtn = createRemoveButton(() => {
    store.dispatch(removeTodoAction(todo.id))
  })
  node.appendChild(text);
  node.appendChild(removeBtn);
  node.style.textDecoration = todo.complete ? 'line-through' : 'none';
  node.addEventListener('click', () => {
    store.dispatch(toggleTodoAction(todo.id));
  })

  document.getElementById('todos')
    .appendChild(node);
}

function addGoalToDom(goal) {
  const node = document.createElement('li');
  const text = document.createTextNode(goal.name);
  const removeBtn = createRemoveButton(() => {
    store.dispatch(removeGoalAction(goal.id));
  });

  node.appendChild(text);
  node.appendChild(removeBtn);

  document.getElementById('goals')
    .appendChild(node);
}