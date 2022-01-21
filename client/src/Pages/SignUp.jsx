import React, { useCallback } from "react";
import UserAuthForm from "../components/UserAuthForm";
import { useUserActions } from "../services/requests";

function SignUp() {
  const userActions = useUserActions();

  const handleSignUp = useCallback(
    async (username, password) => {
      console.log(username, password);
      const response = (await userActions).signUp(username, password);
      console.log(response);
    },
    [userActions]
  );

  return (
    <>
      <UserAuthForm buttonText={"Sign Up"} handleSubmit={handleSignUp} />
    </>
  );
}

export default SignUp;
