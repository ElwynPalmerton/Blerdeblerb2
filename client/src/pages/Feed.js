import React from 'react';
import { useLocation } from 'react-router-dom';

//Components
import Navbar from './Navbar';
import FeedPane from './FeedPane';
import LayoutGrid from './LayoutGrid';


function Feed(props) {
  const location = useLocation();

  return (
    <div>
      <Navbar
        from={location}
      />
      <LayoutGrid
        center={
          <FeedPane />
        }
      />
    </div>
  );
}

export default Feed;