import {
    Button, FormHelperText,
    Grid,
    TextField
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useState } from "react";

function EditNote(props) {
  const [state, setState] = useState({
    title: props.note.title,
    detail: props.note.detail,
    titleError: false,
    detailError: false,
  });

  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  const editNote = event => {
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
    // handle PUT request
    const newNote = { title: state.title, detail: state.detail };
    props.handleEdit(newNote);
    console.log(newNote);
  };

  return (
      <Grid item xs={12} align="left">
        <form>
          <FormControl error={state.titleError} fullWidth sx={{ m: 1, ml: 0 }}>
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
            onClick={editNote}
          >
            Submit Edit
          </Button>
        </form>
      </Grid>
  );
}

export default EditNote;
