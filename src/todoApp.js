// TodoApp.js

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addGroup, deleteGroup, fetchTodoStatus } from './actions';
import './style.css';

const TodoApp = ({ groups, todos, addGroup, deleteGroup, fetchTodoStatus }) => {
  const [newGroupFrom, setNewGroupFrom] = useState('');
  const [newGroupTo, setNewGroupTo] = useState('');
  const [newGroupName, setNewGroupName] = useState('');

  const handleGroupChange = (index, field, value) => {
    // Remove the unused variable 'updatedGroups'
    groups.map((group, i) =>
      i === index ? { ...group, [field]: value } : group
    );

    // Perform any validation here (e.g., check if the rules for groups are valid).
    // For simplicity, I'm not including the validation here.

    // Dispatch the action to update the groups in the Redux store.
    // For example, you could have an action called updateGroups.
    // updateGroups(updatedGroups);
  };

  const handleShowStatus = () => {
    groups.forEach((group) => fetchTodoStatus(group));
  };

  const handleAddGroup = () => {
    const newGroup = {
      name: newGroupName,
      from: parseInt(newGroupFrom, 10),
      to: parseInt(newGroupTo, 10),
    };

    // Perform validation here (Rules 1, 2, and 3).
    if (!isValidGroup(newGroup, groups)) {
      // Handle validation errors here.
      return;
    }

    addGroup(newGroup);
    setNewGroupName('');
    setNewGroupFrom('');
    setNewGroupTo('');
  };

  const isValidGroup = (newGroup, existingGroups) => {
    // Rule 1: The entire range of 1-10 should be covered and no group can go outside the range.
    if (newGroup.from < 1 || newGroup.to > 10) {
      console.log('Group must cover the entire range of 1-10.');
      return false;
    }

    // Rule 2: There should not be any gaps between consecutive groups.
    existingGroups.sort((a, b) => a.from - b.from);
    for (let i = 1; i < existingGroups.length; i++) {
      if (existingGroups[i].from - existingGroups[i - 1].to !== 1) {
        console.log('There should not be any gaps between consecutive groups.');
        return false;
      }
    }

    // Rule 3: There should not be overlap between consecutive groups.
    for (let i = 1; i < existingGroups.length; i++) {
      if (existingGroups[i].from <= existingGroups[i - 1].to) {
        console.log('There should not be overlap between consecutive groups.');
        return false;
      }
    }

    return true;
  };

  return (
    <div className="container">
      <div className="groups-container">
        {groups.map((group, index) => (
          <div className="group" key={index}>
            <div className="delete-icon" onClick={() => deleteGroup(index)}>
              <i className="fas fa-trash-alt"></i>
            </div>
            <div className="group-info left-box">
              <div className="group-number">Group {index + 1}:</div>
              <input
                type="number"
                min="1"
                max="10"
                value={group.from}
                onChange={(e) => handleGroupChange(index, 'from', parseInt(e.target.value))}
              />
              <div className="arrow-icon">
                <i className="fas fa-arrow-right"></i> {/* Add your arrow icon here */}
              </div>
              <input
                type="number"
                min="1"
                max="10"
                value={group.to}
                onChange={(e) => handleGroupChange(index, 'to', parseInt(e.target.value))}
              />
            </div>
            <div className="status">
               {/* Display the status data */}
  {todos[index]?.completedStatus?.map((todo, i) => (
    <div key={todo.id} className={todo.completed ? "success" : "error"}>
      ({todo.id}) {todo.completed ? "true" : "false"}
    </div>
  ))}
              <div className="success-icon">
                <i className="fas fa-check-circle"></i> {/* Add your success icon here */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-group-container">
      <div className="add-group-inputs">
        <div className="group-number-input">
          <input
            type="number"
            placeholder="From"
            value={newGroupFrom}
            onChange={(e) => setNewGroupFrom(e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            value={newGroupTo}
            onChange={(e) => setNewGroupTo(e.target.value)}
          />
        </div>
        <div>
           <button onClick={handleAddGroup} className='add-group-button'>
          <i className="fas fa-plus"></i> Add Group
        </button>
        </div>
      </div >
      <button className="show-status-btn" onClick={handleShowStatus}>
        Show Status
      </button>
    </div>
  </div>

  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    todos: state.todos,
  };
};

export default connect(mapStateToProps, { addGroup, deleteGroup, fetchTodoStatus })(TodoApp);
