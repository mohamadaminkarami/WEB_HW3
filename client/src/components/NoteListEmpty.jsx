import { Alert, AlertTitle, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./../App.css";

function NoteListEmpty() {
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
            <AlertTitle>You don't have any notes</AlertTitle>
            <div>
              If you want to add a note —
              <Link to={"new"} style={{ textDecoration: "none" }}>
                <strong>Click here!</strong>
              </Link>
            </div>
          </Alert>
        </Grid>
      </Grid>
    </>
  );
}

export default NoteListEmpty;
