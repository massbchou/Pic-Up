import logo from '../logo.svg';
import '../CSS/App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Home from './Home';
import Landing from './Landing';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button>Sign-In</button>
      </header>

      <Router>
        <Routes>
          <Route 
            path="/Home"
            element={<Home />}
          />
        </Routes>
      </Router>
    </div>

  
  );
}

export default App;
