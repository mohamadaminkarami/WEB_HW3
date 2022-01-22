import {
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthError from "../components/AuthError";
import { useUserActions } from "../services/requests";

function NoteAdd() {
  const navigate = useNavigate();
  const userActions = useUserActions();
  const [errorState, setErrorState] = useState({
    auth: false,
    message: "",
  });
  const [state, setState] = useState({
    title: "",
    detail: "",
    titleError: false,
    detailError: false,
  });

  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleError = (status, data) => {
    const message = data.errors[0];
    if (status === 401) {
      userActions.logout({ redirect: false });
      setErrorState(oldState => ({
        ...oldState,
        auth: true,
        message: message,
      }));
    }
  };

  const createNote = useCallback(async (title, detail) => {
    const response = await userActions.addNote(title, detail);
    const status = response.status;
    const data = response.data;
    if (status === 201) {
      navigate("/notes");
    } else {
      handleError(status, data);
    }
  }, []);

  const addNote = event => {
    event.preventDefault();
    setState({ ...state, titleError: false, detailError: false });
    if (state.title === "") {
      setState({ ...state, titleError: true });
      return;
    }
    if (state.detail === "") {
      setState({ ...state, detailError: true });
      return;
    }
    console.log({ title: state.title, detail: state.detail });
    createNote(state.title, state.detail);
  };

  return (
    <>
      {errorState.auth ? (
        <Container>
          <AuthError />
        </Container>
      ) : (
        <Container align="center">
          <Grid item sx={{ m: 1 }} xs={9} sm={7.5} md={6} align="left">
            <form>
              <Grid item xs={12}>
                <legend>Add a note!</legend>
              </Grid>
              <FormControl
                error={state.titleError}
                fullWidth
                sx={{ m: 1, ml: 0 }}
              >
                <InputLabel htmlFor="title-input">Note title</InputLabel>
                <OutlinedInput
                  id="title-input"
                  value={state.title}
                  onChange={handleChange("title")}
                  required
                  fullWidth
                  label="Note title"
                />
                <FormHelperText id="title-helper-text">
                  {state.titleError && "Can't be empty."}
                </FormHelperText>
              </FormControl>
              <TextField
                id="detail-input"
                label="Note Detail"
                placeholder="When I was a child I killed a dragon..."
                error={state.detailError}
                helperText={state.detailError && "Can't be empty"}
                fullWidth
                multiline
                variant="outlined"
                value={state.detail}
                onChange={handleChange("detail")}
              />
              <Button
                sx={{ mt: 1 }}
                type="submit"
                color="primary"
                variant="contained"
                onClick={addNote}
              >
                Add
              </Button>
            </form>
          </Grid>
        </Container>
      )}
    </>
  );
}

export default NoteAdd;
