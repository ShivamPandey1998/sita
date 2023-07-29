import { combineReducers } from 'redux';
import { ADD_GROUP, DELETE_GROUP, UPDATE_GROUPS } from './actions';

// Define your initial state
const initialGroups = [
  {
    from: 1,
    to: 10,
  },
];

const initialTodos = [];

// Define your reducers here
const groupsReducer = (state = initialGroups, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return [...state, action.payload];
    case DELETE_GROUP:
      return state.filter((group, index) => index !== action.payload);
    default:
      return state;
  }
};


const todosReducer = (state = initialTodos, action) => {
  switch (action.type) {
    case UPDATE_GROUPS:
      const { groupIndex, completedStatus } = action.payload;
      const newState = [...state];
      newState[groupIndex] = { completedStatus };
      return newState;
    default:
      return state;
  }
};


export default combineReducers({
  groups: groupsReducer,
  todos: todosReducer,
});
