import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useAuth } from '../context/auth';
import { connect } from 'react-redux';
import { login, logout } from '../actions/user'
import checkAuth from '../utils/checkAuth';
import setHeaders from '../utils/setHeaders';


function PrivateRoute({ component: HiddenComponent, ...rest }) {

  const { loggedIn } = rest.loginReducer;

  useEffect(() => {
    if (!loggedIn) {
      setHeaders();
      checkAuth(rest.login, rest.logout);
    }
  }, []);

  return (
    <div>
      <Route
        // {...rest}
        render={
          props =>
            localStorage.getItem('tokens') ? (
              <HiddenComponent random={rest.random} {...props} />

            ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { referer: props.location }
                  }}
                />
              )
        }
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = { login, logout };


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

