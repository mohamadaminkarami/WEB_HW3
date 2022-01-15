import { Button, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container>
      The page you were looking for was not found!
      <div>
      <Link to="/">
        <Button variant="contained">Go home...</Button>
      </Link>
      </div>
    </Container>
  );
}

export default NotFound;
