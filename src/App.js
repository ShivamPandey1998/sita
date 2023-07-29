import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from './todoApp'; // Make sure to import TodoApp
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoApp />
      </Provider>
    </div>
  );
}

export default App;
