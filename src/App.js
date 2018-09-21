import React, { Component } from 'react';
import {
  HashRouter, NavLink, Switch,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Routes from './config/router';
import './App.scss';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <>
          <div id="nav">
            <NavLink exact to="/">Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/about">About</NavLink>
          </div>

          <Switch>
            <Routes />
          </Switch>
        </>
      </HashRouter>
    );
  }
}

export default hot(module)(App);
