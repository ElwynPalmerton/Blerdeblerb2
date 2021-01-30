import { combineReducers } from 'redux';

import loginReducer from './login';
import feedReducer from './feed';
import stylesReducer from './styles';




let combinedReducer = combineReducers({
  loginReducer,
  feedReducer,
  stylesReducer
})

export default combinedReducer;