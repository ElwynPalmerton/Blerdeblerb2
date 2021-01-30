import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/auth';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../actions/user';
import API from '../utils/API';

//Components
import Navbar from './Navbar';
import FormContainer from './FormContainer';

//MUI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
// import { ThemeConsumer } from 'styled-components';


const useStyles = makeStyles((theme) => ({
  label: {
    marginTop: "20px",
    width: "50%",
    height: "125%",
    margin: "auto",
  },
  note: {
    color: theme.palette.secondary.main
  }
}));

function Signup(props) {
  const [error, setError] = useState('');
  const classes = useStyles();

  let referer;
  if (props.location.state && props.location.state.referer) {
    referer = props.location.state.referer;
  } else {
    referer = "/"
  }

  const [userData, setUserData] = useState({
    name: '',
    password: '',
    passwordAgain: ''
  });


  const { setTokens } = useAuth();  //useAuth returns useContext(AuthContext);

  useEffect(() => {
    console.log("Controlled Component: ", userData)
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevs) => {
      return ({
        ...prevs,
        [name]: value
      })
    })
  }

  function handleSubmit(e) {

    e.preventDefault();
    console.log(userData);

    const devUrl = "/users/register";
    // [ ] Replace with API
    //const devUrl2 = "/user/register";
    API({
      method: 'post',
      url: devUrl,
      data: {
        name: userData.name,
        password: userData.password,
        passwordAgain: userData.passwordAgain
      }
    }).then(res => {
      if (!res.data.error) {
        setTokens(res.data.token);
        props.login(res.data);
        // setRegistered(true);
      } else {
        const text = res.data.error;
        setError(text.toString());
        console.log("error: ", error);
      }
    }).catch((e) => {
      console.log("Catching error: ", e);
    });
  }

  return (props.loggedIn ?
    (<Redirect to={referer} />) :

    (<div>
      <Navbar
        from={referer}
      />
      {/* <Card> */}
      <FormContainer>
        <p style={{
          fontSize: "1.5rem",
          color: "#d647ba"
        }}>
          This site is still under-development and may not be fully secure. Please be sure to use a unique password (one which you have not used on another site.)
        </p>
        {error && <p>{error}</p>}
        <TextField
          required
          name="name"
          variant="outlined"
          label="Username"       //top
          value={userData.name}

          onChange={(e) => { handleChange(e) }}
        />
        <TextField
          color="secondary"
          required
          name="password"
          variant="outlined"
          label="Password"
          value={userData.password}
          onChange={(e) => { handleChange(e) }}
        />
        <TextField
          color="secondary"
          required
          name="passwordAgain"
          variant="outlined"
          label="Password"
          value={userData.passwordAgain}
          onChange={(e) => { handleChange(e) }}
        />


        <Button
          variant="contained"
          color="primary"
          className={classes.label}
          onClick={(e) => { handleSubmit(e) }}>
          Register
        </Button>
        <Link to="/login">
          <p
            className={classes.note}
          >Already have an account?</p></Link>
      </FormContainer>
      {/* </Card> */}
    </div>)
  )
}

const mapStateToProps = (state) => {
  const { loginReducer } = state;
  const { loggedIn } = loginReducer;
  return { loggedIn };
}

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
