import React, { createContext, useReducer } from "react";

//context
const AuthContext = createContext();
//state
const initialState = {
  user: null,
};
//reducerfunction
const AuthReducerFunc = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
//AuthProvider
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducerFunc, initialState);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthContextProvider };
