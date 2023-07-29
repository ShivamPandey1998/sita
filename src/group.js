import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteGroup, fetchTodoStatus } from './actions';

const Group = ({ group }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteGroup(group.index));
  };

  const handleShowStatus = () => {
    dispatch(fetchTodoStatus(group));
  };

  return (
    <div>
      Group {group.index + 1}: {group.from} - {group.to}
      <button onClick={handleShowStatus}>Show Status</button>
      <button onClick={handleDelete}>Delete</button>
      {group.completedStatus.map((todo) => (
        <div key={todo.id}>
          Item {todo.id} - {todo.completed ? 'Done' : 'Not Done'}
        </div>
      ))}
    </div>
  );
};

export default Group;
