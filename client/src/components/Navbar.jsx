import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import logo from "./../logo.svg";
import "./../App.css";
import { Grid } from "@mui/material";
import { authAtom } from "../services/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { LoginOutlined } from "@mui/icons-material";
import { useUserActions } from "../services/requests";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

export default function Navbar() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const handleLogout = event => {
    userActions.logout();
  };

  return (
    <AppBar position="static" style={{ background: "#2E3B55" }}>
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <img src={logo} className="App-logo" alt="logo" />
        </IconButton>

        <Grid container spacing={1}>
          <Grid item xs={6} align="left">
            <Typography component="div" sx={{ mt: 0.65 }}>
              {auth ? "Logged In" : ""}
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            {auth ? (
              <Button
                variant=""
                color="info"
                size="small"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </Button>
            ) : (
              <Link to="login" style={{ textDecoration: "none" }}>
                <Button
                  size="medium"
                  sx={{ color: "white" }}
                  startIcon={<LoginOutlined />}
                >
                  Login
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
