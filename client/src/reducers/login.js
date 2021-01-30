const defaultState = {
  loggedIn: false,
  userName: String,
  userID: String,
  following: [],
  bio: '',
}

// [ ] I need to add following in here:

function loginReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return ({
        ...state,
        loggedIn: true,
        userName: action.payload.name,
        userID: action.payload.id,
        bio: action.payload.bio,
        following: action.payload.following
      });
    case 'LOGOUT':
      console.log('LOGGING out');
      return ({
        loggedIn: false
      });
    case 'CHANGE_NAME':
      return ({
        ...state,
        userName: action.payload
      });
    case 'ADD_FOLLOWED_BLERBER':
      return ({
        ...state,
        following: state.following.concat(action.payload),
      });
    case 'UPDATE_BIO':
      return ({
        ...state,
        bio: action.payload,
      });
    default:
      return state;
  }
}

export default loginReducer;