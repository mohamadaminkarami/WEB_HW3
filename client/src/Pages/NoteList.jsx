import { Container } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import AuthError from "../components/AuthError";
import { useUserActions } from "../services/requests";
import NoteListEmpty from "../components/NoteListEmpty";

function NoteList() {
  const userActions = useUserActions();
  const [notes, setNotes] = useState([]);
  const [errorState, setErrorState] = useState({ auth: false, empty: false });

  const fetchData = useCallback(async () => {
    const response = await userActions.getAllNotes();
    if (response.status === 200) {
      const notesReceived = response.data;
      if (notesReceived.length > 0) {
        setNotes(notesReceived);
      } else {
        setErrorState(oldState => ({ ...oldState, empty: true }));
      }
    } else {
      setErrorState(oldState => ({ ...oldState, auth: true }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const renderedNotes = notes.map(note => {
    return <NoteCard note={note} key={note.id} short={true} />;
  });

  return (
    <Container>
      {renderedNotes}
      {errorState.auth && <AuthError />}
      {errorState.empty && <NoteListEmpty />}
    </Container>
  );
}

export default NoteList;
