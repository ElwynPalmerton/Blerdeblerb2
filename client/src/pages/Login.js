import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { connect } from 'react-redux';
import { login, } from '../actions/user';

//Components
import Navbar from './Navbar';
import FormContainer from './FormContainer';

//MUI & styled components

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import API from '../utils/API';


const useStyles = makeStyles((theme) => ({
  label: {
    // color: theme.palette.primary.main,
    width: "100px",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    margin: "auto",
  },
  note: {
    color: theme.palette.secondary.main
  }

}));

function Login(props) {
  const classes = useStyles();
  console.log('in login');

  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { setTokens } = useAuth();


  // The referer is the previous page which the user navigated to before login 
  // After successful login it will be rerouted back to there.
  let referer;
  if (props.location.state && props.location.state.referer) {
    referer = props.location.state.referer;
  } else {
    referer = "/"
  }

  // useEffect(() => {
  //   console.log("referer: ", referer);
  //   console.log("name: ", userName, "password: ", password);
  // });

  function postLogin(e) {


    e.preventDefault();

    const devUrl = "/users/login";

    API.post(devUrl, {
      name: userName,
      password: password
    }).then(result => {
      if (result.status === 200 && !result.data.error) {
        setTokens(result.data.token);  //JWT
        console.log("user after login: ", result.data);
        props.login(result.data);    //redux state

      } else {
        setIsError(true);
      }
    }).catch(e => console.log(e));
  }

  return (
    props.loggedIn ?
      (<Redirect to={referer} />)
      :
      (<div>
        <Navbar
          from={referer}
        />

        <FormContainer>

          {isError && <p>Login Failed</p>}
          <TextField required
            variant="outlined"
            color="secondary"
            label="Username"
            value={userName}
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
          <TextField required id="standard-basic"
            color="secondary"
            variant="outlined"
            label="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }} />

          <Button
            color="primary"
            variant="contained"
            fullWidth={false}
            className={classes.label}
            onClick={postLogin}
            type="submit"
            value="Submit">
            Sign In
          </Button>

          <Link to={{
            pathname: "/signup",
            state: { referer: referer }
          }}
          >
            <p
              className={classes.note}
            >
              Don't have an account?
           </p> </Link>
        </FormContainer>
      </div>)
  )
}

const mapStateToProps = (state) => {
  const { loginReducer } = state;
  const { loggedIn } = loginReducer;
  return { loggedIn };
}

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login);


