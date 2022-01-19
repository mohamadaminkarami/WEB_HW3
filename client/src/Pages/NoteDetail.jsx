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
import React, { useState } from "react";
import EditNote from "../components/EditNote";

function NoteDetail() {
  const [editOpen, setEditOpen] = useState(false);
  // fetch data with id
  const [note, setNote] = useState({
    id: 1,
    title: "Hi",
    detail: "My name is chicky, chicky slim shady!",
  });

  console.log("rendere");

  const handleOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
  };

  const handleEditNote = newNote => {
    setEditOpen(false);
    setNote(newNote);
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
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
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
          <EditNote note={note} handleEdit={handleEditNote} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default NoteDetail;
