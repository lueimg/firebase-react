import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

// root reducer
import rootReducer from './rootReducer';

import { reactReduxFirebase } from 'react-redux-firebase';


import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';


// Firebase config
var config = {
    apiKey: "AIzaSyBAeo-z0Hd9Vfj2u02Yo0Tf4RrsKOvpV9E",
    authDomain: "fir-react-30777.firebaseapp.com",
    databaseURL: "https://fir-react-30777.firebaseio.com",
    projectId: "fir-react-30777",
    storageBucket: "fir-react-30777.appspot.com",
    messagingSenderId: "842729747253"
  };


const sagaMiddleware = createSagaMiddleware();
// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// create the store
const configureStore = () => {
  const store = {
    ...createStore(
      rootReducer,
      composeEnhancers(
        applyMiddleware(
          sagaMiddleware
        ),
        reactReduxFirebase(config, {
          userProfile: 'users', // where profiles are stored in database
          profileFactory: (userData) => { // how profiles are stored in database
            return {
              name: userData.displayName,
              points: 0,
            }
          }
        })
      )
    )
  };

  sagaMiddleware.run(rootSaga);

  return store;
};


export default configureStore;
