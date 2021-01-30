import React, { useState } from 'react'
import API from '../../utils/API';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  secondaryText: {
    color: theme.palette.secondary.main,
  },
  cancelButton: {
    color: theme.palette.primary.main,
    marginLeft: "10px"
  },
}));

function UploadImage(props) {

  const classes = useStyles();

  const [myFile, setFile] = useState(null);
  const history = useHistory();

  function onFormSubmit(e) {

    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage', myFile);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    API.post('/users/image', formData, config)
      .then((response) => {
        console.log('response: ', response);

        history.go(0)
        props.handleSave();

      }).catch((error) => {
        props.handleSave();
        console.log("Error uploading image: ", error);

      })
    console.log("props: ", props);

  }

  function onChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <p>{myFile && myFile.name}</p>
        <Grid container
          spacing={3}
          justify="center"
        >
          <Grid item={true}>
            <Button
              color="primary"
              variant="outlined"
              component="label"
            >
              Choose File
          <input
                hidden
                type="file"
                name="newUserAvatar"
                onChange={onChange}
              />
            </Button>
          </Grid>
          <Grid item={true}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >Upload</Button>
            <Button
              color="primary"
              className={classes.cancelButton}
              variant="outlined"
              onClick={props.handleSave}
            >Cancel</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default UploadImage;