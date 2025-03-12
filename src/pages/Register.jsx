import React, { useState } from "react";
import { auth } from "../firebaseCOnfig";
import { sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";

const Register = () => {
  const [registerData, setRegisterData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await sendSignInLinkToEmail(auth, registerData, {
      url: "http://localhost:5173/complete-register",
      handleCodeInApp: true,
    });
    localStorage.setItem("email", registerData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setRegisterData(e.target.value)}
        ></input>
        <button disabled={registerData ? false : true} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
