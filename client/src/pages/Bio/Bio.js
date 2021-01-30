import React from 'react';

//Components
import NavBar from '../Navbar';
import LayoutGrid from '../LayoutGrid';
import BioPane from './BioPane';

import AvatarUpload from './AvatarUpload';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  secondaryText: {
    color: theme.palette.secondary.main,
  },
}));

function Bio(props) {

  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <LayoutGrid
        center={
          <div>
            <BioPane classes={classes} />
            <AvatarUpload classes={classes} />
          </div>
        }
      />
    </div>
  )
}

export default Bio;