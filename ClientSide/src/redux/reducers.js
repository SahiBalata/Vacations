const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userName: "",
  followedVacations: [],
  unfollowedVacations: []
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isAdmin: action.payload[1],
        isLoggedIn: action.payload[0],
        userName: action.payload[2]
      };
    case "SET_FOLLOWED_VACATIONS":
      return {
        ...state,
        followedVacations: action.payload
      };
    case "SET_UNFOLLOWED_VACATIONS":
      return {
        ...state,
        unfollowedVacations: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
