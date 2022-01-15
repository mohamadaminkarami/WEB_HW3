import React from "react";
import NoteCard from "../components/NoteCard";

function NoteDetail() {
  // fetch data with id
  const note = {
    id: 1,
    title: "Hi",
    detail: "My name is chicky, chicky slim shady!",
  };
  return <NoteCard note={note} />;
}

export default NoteDetail;
