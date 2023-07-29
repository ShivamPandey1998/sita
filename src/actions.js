// Define your action types here
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const FETCH_TODO_STATUS = 'FETCH_TODO_STATUS';
export const UPDATE_GROUPS = 'UPDATE_GROUPS';

// Define your action creators here
export const addGroup = (newGroup) => {
    return {
      type: ADD_GROUP,
      payload: newGroup,
    };
  };

export const deleteGroup = (index) => {
  return {
    type: DELETE_GROUP,
    payload: index,
  };
};

export const fetchTodoStatus = (group) => {
  return async (dispatch, getState) => {
    try {
      // Fetch the status data for each item in the group
      // You can use the provided API URL for this
      const statusData = await Promise.all(
        Array.from({ length: group.to - group.from + 1 }, (_, i) =>
          fetch(`https://jsonplaceholder.typicode.com/todos/${group.from + i}`)
        )
      );

      const completedStatus = await Promise.all(statusData.map((res) => res.json()));

      // Get the 'groups' array from the current state
      const groups = getState().groups;

      // Dispatch an action to update the todos state with the fetched data
      dispatch({
        type: UPDATE_GROUPS,
        payload: { groupIndex: groups.indexOf(group), completedStatus },
      });
    } catch (error) {
      // Handle any errors that might occur during the API request
      console.error('Error fetching todo status:', error);
    }
  };
};
