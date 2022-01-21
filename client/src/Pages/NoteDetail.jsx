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
import { useParams } from "react-router-dom";
import EditNote from "../components/EditNote";
import { useUserActions } from "../services/requests";

function NoteDetail() {
  const params = useParams();
  const [editOpen, setEditOpen] = useState(false);
  const [note, setNote] = useState({});
  const userActions = useUserActions();

  const fetchData = useCallback(async () => {
    const note = await userActions.getNote(params.noteId);
    if (note) setNote(note);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(note);

  const handleOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
  };

  const editNote = useCallback(async (id, title, detail) => {
    const response = await userActions.editNote(id, title, detail);
    console.log(response);
  }, []);

  const handleEdit = newNote => {
    editNote(params.noteId, newNote.title, newNote.detail);
    setEditOpen(false);
    setNote(newNote);
  };

  const deleteNote = useCallback(async id => {
    const response = await userActions.deleteNote(id);
    console.log(response);
  }, []);

  const handleDelete = () => {
    deleteNote(params.noteId);
  };

  return (
    <Container>
      <Card sx={{ minWidth: 275, m: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
    </Container>
  );
}

export default NoteDetail;
