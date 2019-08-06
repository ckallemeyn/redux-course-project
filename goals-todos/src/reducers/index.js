import { combineReducers } from 'redux';

import goals from './goals.js';
import todos from './todos.js';
import loading from './loading.js';

export default combineReducers( {goals, todos, loading });