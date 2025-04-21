import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import AudioPage from './components/Audio/Audio';
import LoginSignup from './components/LoginSignup/LoginSignup';


const Home = () => (
  <>
    <Sidebar />
    <Main />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loginsignup' element={<LoginSignup />} />
        <Route path='/audio' element={<AudioPage />} />
      </Routes>
    </Router>
  );
};

export default App;
