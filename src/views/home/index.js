import React, { Component } from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';

import { AppState } from '../../store/app-state';
import Logo from '../../assets/logo.svg';
import HelloWorld from '../../components/HelloWorld';

const propTypes = {
  appState: PropTypes.instanceOf(AppState),
};

@inject('appState')
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.appState.add();
  }

  render() {
    return (
      <div className="home">
        <div onClick={this.handleClick}>{this.props.appState.msg}</div>
        <img alt="Vue logo" src={Logo} width="200" height="200" />
        <HelloWorld msg="Welcome to Your React.js App" />
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
