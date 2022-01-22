import { LoginOutlined } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Grid, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../services/auth";
import { useUserActions } from "../services/requests";
import "./../App.css";
import logo from "./../logo.svg";
import AddIcon from "@mui/icons-material/Add";

export default function Navbar() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const handleLogout = () => {
    userActions.logout();
  };

  return (
    <AppBar position="static" style={{ background: "#2E3B55" }}>
      <Toolbar>
        <Link to="notes" style={{ textDecoration: "none" }}>
          <Tooltip title="Notes" arrow>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <img src={logo} className="App-logo" alt="logo" />
            </IconButton>
          </Tooltip>
        </Link>
        <Grid container spacing={1}>
          <Grid item xs={6} align="left">
            <Typography component="div" sx={{ mt: 0.65 }}>
              {auth ? "Logged In" : ""}
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            {auth ? (
              <>
                <Link to="/notes/new" style={{ textDecoration: "none" }}>
                  <Tooltip title="Add Note" arrow>
                    <Button size="small" sx={{ color: "white" }}>
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </Link>
                <Tooltip title="Log out" arrow>
                  <Button
                    variant=""
                    color="info"
                    size="small"
                    onClick={handleLogout}
                  >
                    <LogoutIcon />
                  </Button>
                </Tooltip>
              </>
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
