import React, { createContext, useEffect, useReducer } from "react";
import { auth } from "./firebaseCOnfig";
import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";

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
  useEffect(async () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch({
          type: "LOGGED_IN",
          payload: { email: user.email, token: await getIdTokenResult(user) },
        });
      } else {
        dispatch({ type: "LOGGED_IN", payload: null });
      }
    });
  });
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthContextProvider };
