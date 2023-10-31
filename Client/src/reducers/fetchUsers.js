const fetchUsers = (state = { users: null }, action) => {
  switch (action.type) {
    case "FETCH_ALL_USERS":
      return { ...state, users: action?.data };

    default:
      return state;
  }
};

export default fetchUsers;
