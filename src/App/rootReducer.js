import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

export default combineReducers(
  {
    users: (state=[], action) => state,
    firebase: firebaseStateReducer
  }
);
