import React, { Component } from 'react';
import {
  HashRouter, Route, NavLink, Switch,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Home from './views/home';
import About from './views/about';
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
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </>
      </HashRouter>
    );
  }
}

export default hot(module)(App);
