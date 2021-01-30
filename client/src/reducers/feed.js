const defaultState = {
  initializedPosts: false,
  initializedFeed: false,
  posts: [],           //user posts.
  blerbs: [],          //Timeline of all blerbs as delivered from the server/other users.
  lastUpdated: null,
};


function feedReducer(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_POST':
      return ({
        ...state,
        posts: [action.payload].concat(state.posts)
      });

    case 'INITIALIZE_POSTS':
      return ({
        ...state,
        initializedPosts: true,
        posts: action.payload,
      });

    case 'INITIALIZE_BLERBS':
      return ({
        ...state,
        initializedFeed: true,
        blerbs: action.payload,
        lastUpdated: action.payload[0].createdAt
      });

    case 'ADD_BLERB':
      return ({
        ...state,
        blerbs: [action.payload].concat(state.blerbs)
      });

    case 'ADD_BLERBS':
      return ({
        ...state,
        blerbs: [...action.payload].concat(state.blerbs),
        lastUpdated: action.payload[0].createdAt
      });

    case 'ADD_HISTORY':
      return ({
        ...state,
        blerbs: state.blerbs.concat([...action.payload])
      })

    case 'LIKE_BLERB':
      return ({
        ...state,
        blerbs: state.blerbs.map(blerb => {
          if (blerb._id === action.payload._id) {
            return action.payload;
          } else {
            return blerb;
          }
        })
      })

    case 'LIKE_POST':
      console.log('Liking in reducer')
      return ({
        ...state,
        posts: state.posts.map(blerb => {
          if (blerb._id === action.payload._id) {
            return action.payload;
          } else {
            return blerb;
          }
        })
      })

    case 'PRE_LIKE_BLERB':
      return ({
        ...state,
        blerbs: state.blerbs.map(blerb => {
          if (blerb._id === action.payload) {
            return {
              ...state.blerb,
              likes: blerb.likes.concat(action.payload),
              totalLikes: blerb.totalLikes + 1,
            }
          } else {
            return blerb;
          }
        })
      })
    default:
      return state;
  }
}


export default feedReducer;

// [ ] Refactor INITIALIZE_POSTS to be INITIALIZE_USER_BLERBS