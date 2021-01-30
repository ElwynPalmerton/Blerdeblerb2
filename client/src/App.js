import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

///PAGES
import Home from './pages/Home';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import FindBlerbers from './pages/FindBlerbers';
import Bio from './pages/Bio/Bio';
import Following from './pages/Following';
import PrivateRoute from './pages/PrivateRoute';

//Styles
import StylesContext from './pages/StylesContext';
import CssBaseline from '@material-ui/core/CssBaseline';

//State
import combinedReducers from './reducers/combinedReducers';


import { AuthContext } from './context/auth';
import setHeaders from './utils/setHeaders';

import setTokens from './utils/setTokens';


//Set up Redux store
let store = createStore(combinedReducers);
store.subscribe(() => console.log("STORE: ", store.getState()));

console.log("STORE: ", store.getState());

function App(props) {

  setHeaders();
  return (

    <AuthContext.Provider value={
      {
        setTokens  //Helper function which puts the JWT in local storage.
      }
    }>
      <Provider store={store}>
        <StylesContext>
          <Router>
            <CssBaseline />
            <div>
              <Switch>
                {/* <Route exact path="/" component={Home}>
                </Route> */}
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute
                  path="/profile"
                  component={Profile}
                />
                <PrivateRoute
                  path="/findBlerbers"
                  component={FindBlerbers}
                />
                <PrivateRoute
                  path="/bio"
                  component={Bio}
                />
                <PrivateRoute
                  path="/following"
                  component={Following}
                />
                <PrivateRoute
                  path="/"
                  component={Feed}
                />
              </Switch>
            </div>
          </Router>
        </StylesContext>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
