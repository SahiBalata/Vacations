export const setIsLoggedIn = function setIsLoggedIn(
  isLoggedIn,
  isAdmin,
  userName
) {
  return { type: "SET_IS_LOGGED_IN", payload: [isLoggedIn, isAdmin, userName] };
};
export const setFollowedVacations = function setFollowedVacations(
  followedVacations
) {
  return { type: "SET_FOLLOWED_VACATIONS", payload: followedVacations };
};

export const setUnFollowedVacations = function setUnFollowedVacations(
  unfollowedVacations
) {
  return { type: "SET_UNFOLLOWED_VACATIONS", payload: unfollowedVacations };
};
export const setVacationNames = function setVacationNames(arr) {
  return { type: "SET_VACATION_NAMES", payload: arr };
};
export const setVacationFollowers = function setVacationFollowers(arr) {
  return { type: "SET_VACATION_FOLLOWERS", payload: arr };
};
