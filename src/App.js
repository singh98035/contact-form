import React from 'react';
import './App.css';
import Contact from './contact-form';
import DisplayInfo from './displayInfo';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <div className='header'>

          <div className='nav-item'>
            <Link to="/" style={{ textDecoration: 'none' }}> <span>Contact Form</span></Link>
          </div>
          <div className='nav-item'>
            <Link to="/Data" style={{ textDecoration: 'none' }}><span >Check Mails</span></Link>
          </div>
        </div>
        <Routes>
          <Route exact path='/' element={<Contact />}></Route>
          <Route exact path='/Data' element={<DisplayInfo />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
