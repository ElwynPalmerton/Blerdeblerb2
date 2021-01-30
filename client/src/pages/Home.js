//Some of the stuff in App should be refactored into separate files.

import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Home(props) {

  const location = useLocation();

  return (
    <div>
      <Navbar
        value="12"
        from={location}
      />
      <h1>Home</h1>
    </div>
  )
}

export default Home;