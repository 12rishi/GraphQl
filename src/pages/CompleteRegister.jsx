import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebaseCOnfig";
import { AuthContext } from "../AuthContext";
import {
  getIdTokenResult,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const CompleteRegister = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setEmail(window.localStorage.getItem("email"));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailLink(auth, email, window.location.href); //signin with email and the token it provide in the url

      if (res.user.emailVerified === true) {
        let user = auth.currentUser;
        await updatePassword(user, password); // update the password  for that user
        console.log(user);
        const token = await getIdTokenResult(user); //give token
        dispatch({
          type: "LOGGED_IN",
          payload: { email: user.email, token: token },
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" disabled value={email} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CompleteRegister;
