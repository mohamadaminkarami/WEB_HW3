import React from "react";
import { Alert, AlertTitle, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./../App.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AccessError(props) {
  const message = props.message;
  return (
    <>
      <Grid
        container
        sx={{ m: 1 }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12}>
          <Alert severity="error">
            <AlertTitle>Error in accessing data</AlertTitle>
            {message}
            
          </Alert>
        </Grid>
        <Grid item xs={12} align="right">
            <Link to={"/notes"} replace style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<ArrowBackIcon />}
              >
                Back to Notes
              </Button>
            </Link>
          </Grid>
      </Grid>
    </>
  );
}

export default AccessError;
