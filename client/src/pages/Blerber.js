import React from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import defaultUserAvatar from './Bio/assets/defaultUserAvatar.png';
import Grid from '@material-ui/core/Grid';
import { baseURL } from '../utils/API';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(4),
    },
  },
  userName: {
    fontWeight: "bold",
    margin: theme.spacing(1),
  },
  button: {
    background: theme.palette.primary.main,
    color: "#111111",
  }
}));

function Blerber(props) {
  const classes = useStyles();

  function onImageError(e) {
    console.log('image error');
    e.target.onerror = null;
    e.target.src = defaultUserAvatar;
  }

  const tempStyle = {
    borderRadius: "100px",
    height: "90px",
    width: "90px",
  }

  const avatarBaseUrl = baseURL + "/users/avatar/"
  // const testUrl = "http://localhost:9000/users/avatar/5fb327becd18317c404a52ed"
  const imgUrl = avatarBaseUrl + props.blerber._id;

  const buttonText = props.following ? "Unfollow" : "Follow";


  return (
    <Box my={4}>
      <Paper
        className={classes.root}
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          spacing={3}>
          <Grid item={true} sm={4}>

            <img
              style={tempStyle}
              alt=""
              onError={onImageError}
              src={imgUrl}

            />
          </Grid>
          <Grid item={true} sm={8}>
            <h4
              className={classes.userName}
            >{props.blerber.name}</h4>
            <p>{props.blerber.bio}</p>
            {/* <p>The bio would go here. </p> */}
            <div
              style={{ textAlign: "right" }}
            >
              <Button
                className={classes.button}
                // variant="outlined"
                disableElevation={true}
                onClick={props.handleClick}
                value={props.blerber._id}
              >{buttonText}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Blerber;