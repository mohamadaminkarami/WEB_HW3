import React, { useCallback } from "react";
import UserAuthForm from "../../components/UserAuthForm";
import { useUserActions } from "../../services/requests";

function Login() {
  const userActions = useUserActions();

  const handleLogin = useCallback(
    async (username, password) => {
      console.log(username, password);
      const response = (await userActions).login(username, password);
      console.log(response);
    },
    [userActions]
  );

  return (
    <>
      <UserAuthForm buttonText={"Sign in"} handleSubmit={handleLogin} />
    </>
  );
}

export default Login;
