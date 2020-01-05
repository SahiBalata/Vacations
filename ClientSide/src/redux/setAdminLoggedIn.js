export const setAdminLoggedIn = function setAdminLoggedIn(isAdmin) {
  return { type: "SET_IS_LOGGED_ADMIN", payload: isAdmin };
};
