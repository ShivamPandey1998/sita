import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <div>
      Item {todo.id} - {todo.completed ? 'Done' : 'Not Done'}
    </div>
  );
};

export default TodoItem;
