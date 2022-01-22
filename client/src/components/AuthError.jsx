import { Alert, AlertTitle, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./../App.css";

function AuthError() {
  return (
    <>
      <Grid
        container
        sx={{ m: 1 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12}>
          <Alert severity="warning">
            <AlertTitle>You're not Authenticated</AlertTitle>
            <div>
              If you have an account —{" "}
              <Link to={"/login"} replace style={{ textDecoration: "none" }}>
                <strong>Click here to login!</strong>
              </Link>
            </div>
            <div>
              If you don't have an account —{" "}
              <Link to={"/signup"} replace style={{ textDecoration: "none" }}>
                <strong>Click here to sign up!</strong>
              </Link>
            </div>
          </Alert>
        </Grid>
      </Grid>
    </>
  );
}

export default AuthError;
