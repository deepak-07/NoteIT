import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {Routes, Route } from "react-router-dom"
import { Container } from 'react-bootstrap';
import {NewNote} from './components/NewNote';

function App() {
  return (
    <Container >
    <Routes>
      <Route path="/" element={<h1>hellis</h1>} />
      <Route path="/new" element={<NewNote/>} />
      <Route path="/:id">
        {/* <Route index element={<h1>Show</h1>} />
        <Route path="/edit" element={<h1>Edit</h1>} /> */}
      </Route>
    </Routes>
    </Container>
    
  );
}

export default App;
