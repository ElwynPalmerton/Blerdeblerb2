
import React, { useState } from 'react';
import { connect } from 'react-redux';
import API from '../utils/API';
import { addPost, addBlerb } from '../actions/feed';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "434px",
    fontFamily: "TimesNewRoman",
    marginBottom: "20px"
  },
  form: {
    margin: "30px 0px 30px",
  },
  textField: {
    color: "red",
    margin: "30px",
    marginBottom: "30px"
  },
  button: {
    // marginTop: "20px"
  }
}));


function PostForm(props) {

  const classes = useStyles();

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handlePost(e) {

    e.preventDefault();

    API.post('feed/post', {
      text: text,
    }).then(result => {
      if (result.data) {
        props.addPost(result.data);
        props.addBlerb(result.data);
        setText('');

      } else {
        setError('Unable to blerb to server.');
      }

    }).catch((e) => {
      console.log("error: ", e);
    })
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('Text');
    const trimmed = pasted.slice(0, 180);
    console.log(trimmed);
    setText(trimmed);
  }

  function handleChange(e) {
    e.preventDefault();
    if (text.length <= 180) {
      setText(e.target.value);
      setError("");
      if (text.length >= 180) {
        setError('180 character limit.');
      }
    } else {
      setError("180 character limit.");
      const editedText = text.slice(0, 180) //'abcde'
      setText(editedText);
    }
  }

  return (
    <form
      className={classes.form}>
      <TextField
        helperText={error}
        className={classes.root}
        multiline
        variant="outlined"
        onPaste={handlePaste}
        onChange={handleChange}
        color="secondary"
        placeholder="Blerb something..."
        value={text} />
      <br />
      <div style={{ textAlign: "right" }}>
        <Button
          color="primary"
          className={classes.button}
          variant="contained"
          disableElevation={true}
          onClick={handlePost}
        >Post</Button>
      </div>
    </form>
  )
}

const mapDispatchToProps = { addPost, addBlerb };

export default connect(null, mapDispatchToProps)(PostForm);