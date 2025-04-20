import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import AudioPage from './components/Audio/Audio';

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
        <Route path='/audio' element={<AudioPage />} />
      </Routes>
    </Router>
  );
};

export default App;
