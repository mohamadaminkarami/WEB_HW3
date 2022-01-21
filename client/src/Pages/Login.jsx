import { Alert, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthForm from "../components/UserAuthForm";
import { useUserActions } from "../services/requests";

function Login() {
  const navigate = useNavigate();
  const userActions = useUserActions();
  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    message: "",
  });

  const handleLogin = useCallback(async (username, password) => {
    const response = await userActions.login(username, password);
    if (response.status === 200) {
      navigate("/notes");
    } else {
      setSnackbarState({
        open: true,
        message: response.data.errors[0],
      });
    }
  }, []);

  const handleClose = event => {
    setSnackbarState(oldState => ({ ...oldState, open: false }));
  };

  return (
    <>
      <UserAuthForm mode={"login"} handleSubmit={handleLogin} />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          <strong>{snackbarState.message}</strong>
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
