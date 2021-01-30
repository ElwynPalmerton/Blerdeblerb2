import React from 'react';
// import { Button } from '../components/AuthForm';
import { useAuth } from '../context/auth';
import { connect } from 'react-redux';
import { logout } from '../actions/user';



import Button from '@material-ui/core/Button';

function LogoutButton(props) {

  const { setTokens } = useAuth();

  function logOut() {
    setTokens(null);
    props.logout();
  }

  return (
    <Button
      onClick={logOut}
      className={props.class}
    >Log out
    </Button>
  )
}


const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);