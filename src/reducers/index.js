import { combineReducers } from 'redux';
import groupsReducer from './groupsReducer';
import todosReducer from './todosReducer';

const rootReducer = combineReducers({
  groups: groupsReducer,
  todos: todosReducer,
});

export default rootReducer;
