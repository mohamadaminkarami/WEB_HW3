import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, FormHelperText, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";

function UserAuthForm() {
  const [state, setState] = React.useState({
    username: "",
    password: "",
    usernameError: false,
    passwordError: false,
    showPassword: false,
  });

  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const submitForm = event => {
    event.preventDefault();
    setState({ ...state, usernameError: false, passwordError: false });
    if (state.username.length < 8) {
      setState({ ...state, usernameError: true });
      return;
    }
    if (state.password === "") {
      setState({ ...state, passwordError: true });
      return;
    }
    console.log(state.username, state.password);
  };

  return (
    <Container align="center">
      <Grid item sx={{ m: 1 }} xs={9} sm={7.5} md={6} align="left">
        <form>
          <Grid item xs={12}>
            <legend>Enter your username and password</legend>
          </Grid>
          <FormControl
            error={state.usernameError}
            fullWidth
            sx={{ m: 1, ml: 0 }}
          >
            <InputLabel htmlFor="username-input">Username</InputLabel>
            <OutlinedInput
              id="username-input"
              value={state.username}
              onChange={handleChange("username")}
              required
              fullWidth
              label="Username"
            />
            <FormHelperText id="username-helper-text">
              {state.usernameError && "At least 8 characters required."}
            </FormHelperText>
          </FormControl>
          <FormControl
            error={state.passwordError}
            fullWidth
            sx={{ m: 1, ml: 0 }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="password-input"
              type={state.showPassword ? "text" : "password"}
              value={state.password}
              onChange={handleChange("password")}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText id="username-helper-text">
              {state.passwordError && "Shouldn't be empty."}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={submitForm}
          >
            Sign in
          </Button>
        </form>
      </Grid>
    </Container>
  );
}

export default UserAuthForm;
