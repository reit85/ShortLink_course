import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Link, Switch, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// Components
import Signup from '../ui/signup';
import Links from '../ui/link';
import NotFound from '../ui/notFound';
import Login from '../ui/login';

const history = createBrowserHistory();
//console.log(history.location.pathname);

const unauthenticatedPages = ['/', '/signup', '/login'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  if (Meteor.userId()){
    return true;
  }
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    //console.log('Angemeldet ' + isAuthenticated)  

    if(isUnauthenticatedPage && isAuthenticated){
        history.replace('/links');
    }
    else if (isAuthenticatedPage && !isAuthenticated){
        history.replace('/');
    }
};

export const routes = (
  <Router history={history}>
    <div>
      <Switch>
        { /*<Route path="/" exact component={Login}/> */}

        <Route exact path="/" render={() => (
          onEnterPublicPage() ? (
            <Redirect to="/links"/>
          ) : (
            <Redirect to="/login"/>
          )
        )}/>

        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/links" component={Links}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </Router>
);