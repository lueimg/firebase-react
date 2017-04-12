import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './App/store';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom';
import { pathToJS } from 'react-redux-firebase';

import './index.css';
const store = configureStore();

// grab our App and Profile containers
import App from './App/AppContainer';
import Profile from './App/ProfileContainer';

// restricts access to a route for authenticated users only
function PrivateRoute ({component: Component, ...rest}) {
  const auth = pathToJS(store.getState().firebase, 'auth');
  return (
    <Route
      {...rest}
      render={(props) => auth && auth.uid
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App}></Route>
        <PrivateRoute path="/profile" component={Profile} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
