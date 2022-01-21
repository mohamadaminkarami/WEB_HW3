import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteList from './Pages/NoteList';
import NoteDetail from './Pages/NoteDetail';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import NoteAdd from './Pages/NoteAdd';
import NotFound from './Pages/NotFound';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="notes" element={<NoteList />} />
          <Route path="notes/new" element={<NoteAdd />} />
          <Route path="notes/:noteId" element={<NoteDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
