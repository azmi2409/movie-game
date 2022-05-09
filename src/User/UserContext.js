import { useState, createContext, useReducer } from "react";
import { userReducer } from "./UserReducer";

export const UserContext = createContext();

const storage = localStorage.getItem("user");

const currentUser = JSON.parse(storage) || {};

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, currentUser);
  const [darkMode, setDarkMode] = useState(false);
  return (
    <UserContext.Provider
      value={{ userData: user, userDispatch: dispatch, darkMode, setDarkMode }}
    >
      {children}
    </UserContext.Provider>
  );
};
