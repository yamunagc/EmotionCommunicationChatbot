import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import AudioPage from './components/Audio/Audio';
import Signin from './components/Signin/Signin';



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
        <Route path='/signin' element={<Signin />} />
        <Route path='/audio' element={<AudioPage />} />
      </Routes>
    </Router>
  );
};

export default App;
