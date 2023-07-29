import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { addGroup, deleteGroup, fetchTodoStatus } from './actions';
import './style.css';

const TodoApp = ({
  groups,
  todos,
  addGroup,
  deleteGroup,
  fetchTodoStatus,
  loadingStatusProp, 
  errorStatusProp, 
}) => {
  const [newGroupFrom, setNewGroupFrom] = useState('');
  const [newGroupTo, setNewGroupTo] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [addError, setAddError] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(loadingStatusProp);
  const [errorStatus, setErrorStatus] = useState(errorStatusProp); 

  const handleGroupChange = useCallback((index, field, value) => {
    const updatedGroups = groups.map((group, i) =>
      i === index ? { ...group, [field]: value } : group
    );
  }, [groups]);

  const handleShowStatus = async () => {
    try {
      setLoadingStatus(true);
      setErrorStatus(false);

      for (const group of groups) {
        await fetchTodoStatus(group);
      }

      setLoadingStatus(false);
    } catch (error) {
      setLoadingStatus(false);
      setErrorStatus(true);
    }
  };

  const handleAddGroup = () => {
    const newGroup = {
      name: newGroupName,
      from: parseInt(newGroupFrom, 10),
      to: parseInt(newGroupTo, 10),
    };

    if (!isValidGroup(newGroup, groups)) {
      setAddError(
        'Invalid group: The group must cover the entire range of 1-10 and have no gaps or overlaps.'
      );
      return;
    }

    addGroup(newGroup);
    setNewGroupName('');
    setNewGroupFrom('');
    setNewGroupTo('');
    setAddError('');
  };

  const isValidGroup = (newGroup, existingGroups) => {
    if (newGroup.from < 1 || newGroup.to > 10) {
      console.log('Group must cover the entire range of 1-10.');
      return false;
    }

    existingGroups.sort((a, b) => a.from - b.from);
    for (let i = 1; i < existingGroups.length; i++) {
      if (existingGroups[i].from - existingGroups[i - 1].to !== 1) {
        console.log('There should not be any gaps between consecutive groups.');
        return false;
      }
    }

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
                onChange={(e) =>
                  handleGroupChange(index, 'from', parseInt(e.target.value, 10))
                }
              />
              <div className="arrow-icon">
                <i className="fas fa-arrow-right"></i>
              </div>
              <input
                type="number"
                min="1"
                max="10"
                value={group.to}
                onChange={(e) =>
                  handleGroupChange(index, 'to', parseInt(e.target.value, 10))
                }
              />
              {/* <div className="group-range">({group.from} - {group.to})</div> */}
            </div>
            <div className="status">
              {todos[index]?.completedStatus?.map((todo, i) => (
                <div key={todo.id} className={todo.completed ? 'success' : 'error'}>
                  ({todo.id}) {todo.completed ? 'true' : 'false'}
                </div>
              ))}
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
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
            <button onClick={handleAddGroup} className="add-group-button">
              <i className="fas fa-plus"></i> Add Group
            </button>
            {addError && <div className="error-message">{addError}</div>}
          </div>
        </div>
        <button
          className="show-status-btn"
          onClick={handleShowStatus}
          disabled={loadingStatus}
        >
          {loadingStatus ? 'Loading...' : 'Show Status'}
        </button>
        {errorStatus && <div className="error-message">Error fetching status data</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    todos: state.todos,
    loadingStatusProp: state.loadingStatus, // Add this line to map to the prop
    errorStatusProp: state.errorStatus, // Add this line to map to the prop
  };
};

export default connect(mapStateToProps, { addGroup, deleteGroup, fetchTodoStatus })(
  TodoApp
);
