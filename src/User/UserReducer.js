const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const login = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const userReducer = (state = {}, action) => {
  let data;
  switch (action.type) {
    case LOGIN:
      data = {
        ...state,
        isLoggedIn: true,
        user: action.user.user,
        token: action.user.token,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    case LOGOUT:
      data = {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
      };
      localStorage.removeItem("user");
      return data;
    default:
      return state;
  }
};
