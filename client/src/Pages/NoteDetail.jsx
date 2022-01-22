import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { Container, Dialog, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccessError from "../components/AccessError";
import AuthError from "../components/AuthError";
import EditNote from "../components/EditNote";
import { useUserActions } from "../services/requests";
import { Alert, Snackbar } from "@mui/material";

function NoteDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [note, setNote] = useState({});
  const userActions = useUserActions();

  const [fetchErrorState, setFetchErrorState] = useState({
    auth: false,
    notFound: false,
    noPermission: false,
    message: "",
  });

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
  });

  const handleError = (status, data) => {
    const message = data.errors[0];
    if (status === 401) {
      userActions.logout({ redirect: false });
      setFetchErrorState(oldState => ({ ...oldState, auth: true }));
    } else if (status === 403) {
      setFetchErrorState(oldState => ({
        ...oldState,
        noPermission: true,
        message: message,
      }));
    } else if (status === 404) {
      setFetchErrorState(oldState => ({
        ...oldState,
        notFound: true,
        message: message,
      }));
    }
  };

  const fetchData = useCallback(async () => {
    const response = await userActions.getNote(params.noteId);
    const status = response.status;
    const data = response.data;
    if (status === 200) {
      setNote(data);
    } else {
      handleError(status, data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
  };

  const editNote = useCallback(async (id, title, detail) => {
    const response = await userActions.editNote(id, title, detail);
    const status = response.status;
    const data = response.data;
    setEditOpen(false);
    if (response.status === 200) {
      setNote({ title: data.title, detail: data.detail });
    } else {
      handleError(status, data);
      setSnackbarState(oldState => ({
        ...oldState,
        open: true,
        message: response.data.errors[0],
      }));
    }
  }, []);

  const handleEdit = newNote => {
    editNote(params.noteId, newNote.title, newNote.detail);
  };

  const deleteNote = useCallback(async id => {
    const response = await userActions.deleteNote(id);
    const status = response.status;
    const data = response.data;
    if (status === 204) {
      navigate("/notes");
    } else {
      handleError(status, data);
      setSnackbarState(oldState => ({
        ...oldState,
        open: true,
        message: response.data.errors[0],
      }));
    }
  }, []);

  const handleDelete = () => {
    deleteNote(params.noteId);
  };

  const handleSnackClose = event => {
    setSnackbarState(oldState => ({ ...oldState, open: false }));
  };

  return (
    <Container>
      {fetchErrorState.auth && <AuthError />}
      {(fetchErrorState.notFound || fetchErrorState.noPermission) && (
        <AccessError message={fetchErrorState.message} />
      )}
      {!fetchErrorState.auth &&
        !fetchErrorState.notFound &&
        !fetchErrorState.noPermission && (
          <>
            <Card sx={{ minWidth: 275, m: 1 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {note.title}
                </Typography>
                <Typography variant="h5" component="div">
                  {note.detail}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  startIcon={<EditSharpIcon />}
                  onClick={handleOpen}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
            <Dialog open={editOpen} onClose={handleClose}>
              <DialogTitle>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    Edit your Note!
                  </Grid>
                  <Grid item xs={3} align="right">
                    <Button color="error" onClick={handleClose}>
                      <CloseIcon />
                    </Button>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent>
                <EditNote note={note} handleEdit={handleEdit} />
              </DialogContent>
            </Dialog>
            <Snackbar
              open={snackbarState.open}
              autoHideDuration={6000}
              onClose={handleSnackClose}
            >
              <Alert
                onClose={handleSnackClose}
                variant="filled"
                severity="error"
                sx={{ width: "100%" }}
              >
                <strong>{snackbarState.message}</strong>
              </Alert>
            </Snackbar>
          </>
        )}
    </Container>
  );
}

export default NoteDetail;
