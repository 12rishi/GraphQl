import React, { useEffect, useState } from "react";
import { auth } from "../firebaseCOnfig";
import { signInWithEmailLink, updatePassword } from "firebase/auth";

const CompleteRegister = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  useEffect(() => {
    setEmail(window.localStorage.getItem("email"));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailLink(auth, email, window.location.href);
      console.log(res);
      if (res.user.emailVerified === true) {
        let user = auth.currentUser;
        await updatePassword(user, password);
        console.log(user);
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
