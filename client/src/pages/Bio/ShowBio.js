import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    width: "100%",
    marginBottom: "20px",
    color: theme.palette.secondary.main
  },
  div: {
    textAlign: "center",
    // margin: "0 auto"
  },
  div2: {
    textAlign: "right"
  },
  button: {
    color: theme.palette.primary.main
  }
}));

function ShowBio(props) {
  const classes = useStyles();
  const name = props.user.userName;

  return (
    <div>
      <div className={classes.div}>
        <h1>{name}</h1>
        <p><span>{props.user.bio} </span>
          <Button
            className={classes.button}
            // variant="outlined"
            onClick={props.handleClick}
          >
            ...edit bio
        </Button></p>
      </div>
      <div
        className={classes.div2}
      >
      </div>
    </div>)
}

const mapStateToProps = ((state) => {
  return ({ user: state.loginReducer })
})

const ConnectedShowBio = connect(mapStateToProps)(ShowBio);


export default ConnectedShowBio;