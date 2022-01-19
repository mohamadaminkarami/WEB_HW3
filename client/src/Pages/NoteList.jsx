import { Container } from "@mui/material";
import React from "react";
import NoteCard from "../components/NoteCard";

function NoteList() {
  const noteList = [
    {
      id: 1,
      title: "Hi",
      detail: "My name is chicky, chicky slim shady!",
    },
    {
      id: 2,
      title: "RapGod",
      detail: "Summa lamma duma lamma gibby gibby!",
    },
    {
      id: 3,
      title: "Jojo",
      detail: "Hitler was not cool bro!",
    },
  ];

  const renderedNotes = noteList.map(note => {
    return <NoteCard note={note} key={note.id} />;
  });

  return <Container>{renderedNotes}</Container>;
}

export default NoteList;
