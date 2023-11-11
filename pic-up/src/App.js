import React, { useState, useEffect} from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home'; // import your Home component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  // fetch('/')
  //   .then((res) => res.text())
  //   .then((data) => setMessage(data))
  //   .catch((err) => console.log(err));
  // }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;