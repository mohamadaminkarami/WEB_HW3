import { Container } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useUserActions } from "../services/requests";

function NoteList() {
  const userActions = useUserActions();
  const [notes, setNotes] = useState([]);

  const fetchData = useCallback(async ()=> {
    const allNotes = await userActions.getAllNotes();
    if (allNotes) setNotes(allNotes);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(notes);

  const renderedNotes = notes.map(note => {
    return <NoteCard note={note} key={note.id} />;
  });

  return <Container>{renderedNotes}</Container>;
}

export default NoteList;
