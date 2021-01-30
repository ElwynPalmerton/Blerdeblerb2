const init = localStorage.getItem('darkmode');

console.log("init: ", init);

const defaultState = { darkMode: true };

function stylesReducer(state = defaultState, action) {

  switch (action.type) {
    case 'TOGGLE_DARKMODE':
      console.log('toggling', state);
      // return Object.assign({}, state, {
      //   darkMode: !state.darkMode
      // });
      return ({
        ...state,
        darkMode: action.payload,

      });
    default:
      return state;
  }
}

export default stylesReducer;