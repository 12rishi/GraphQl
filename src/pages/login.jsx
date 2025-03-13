import React, { useContext, useState } from "react";
import { auth, googleProvider } from "../firebaseCOnfig";
import AuthContext from "../AuthContext";
import {
  getIdTokenResult,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      if (user) {
        const token = await getIdTokenResult(user);
        if (!token) {
          throw Error("please provide token");
        }
        dispatch({ type: "LOGGED_IN", payload: { email: user.email, token } });
        navigate("/");
      }
    } catch (error) {}
  };
  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (!res) {
        throw Error("user doesnot exist");
      }
      const user = res.user;
      const token = await getIdTokenResult(user);
      dispatch({ type: "LOGGED_IN", payload: { email: user.email, token } }); //login with google
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button disabled={!email || !password} type="submit">
          Submit
        </button>
      </form>
      <button onClick={() => handleGoogle}>login with google</button>
    </div>
  );
};

export default Login;
