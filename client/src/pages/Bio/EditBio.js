import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  text: {
    width: "100%",
    marginBottom: "20px",
    color: theme.palette.secondary.main
  },
  div: {
    textAlign: "center",
  },
  div2: {
    textAlign: "right",
  },
  purple: {
    color: theme.palette.primary.main,
  }
}));

function EditBio(props) {

  const classes = useStyles();
  const name = props.user.userName;
  const bio = props.user.bio;

  const [bioText, setBioText] = useState(bio);

  function handleChange(e) {
    setBioText(e.target.value);
  }

  return (<div
    className={classes.div}>
    <h1

    >{name}</h1>

    <br />

    <TextField
      value={bioText}
      className={classes.text}
      multiline
      variant="outlined"
      onChange={handleChange}
    />

    <div
      className={classes.div2}>
      <Button
        variant="contained"
        color="primary"
        className={classes.primary}
        onClick={() => props.handleSave(bioText)}
      >Save Bio
    </Button>
    </div>
  </div>)
}

const mapStateToProps = ((state) => {
  return ({ user: state.loginReducer })
})

const ConnectedShowBio = connect(mapStateToProps)(EditBio);

export default ConnectedShowBio;