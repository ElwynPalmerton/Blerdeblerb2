const setTokens = (data) => {

  console.log("setTokens: ", data);
  if (data) {
    // user login
    localStorage.setItem("tokens", JSON.stringify(data));
  } else {
    // user logout
    localStorage.removeItem("tokens");
  }
  // setAuthTokens(data);
}

export default setTokens;