
import axios from 'axios';
import API from './API';

//This should return false if there is no token.


function setHeaders() {
  const token = localStorage.getItem('tokens');

  // console.log("token", token);

  if (token === null) {
    // console.log("token is null: ", token)
    // logout();
    return false;
  } else {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //Remove this after I set it up to use API in all of the requests.
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
  }
}

export default setHeaders;