import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import "./index.css";
import Login from "./Pages/Login";
import NoteAdd from "./Pages/NoteAdd";
import NoteDetail from "./Pages/NoteDetail";
import NoteList from "./Pages/NoteList";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="notes" />} />
          <Route path="notes" element={<NoteList />} />
          <Route path="notes/new" element={<NoteAdd />} />
          <Route path="notes/:noteId" element={<NoteDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
