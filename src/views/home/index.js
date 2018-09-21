import React, { Component } from 'react';
import Logo from '../../assets/logo.svg';
import HelloWorld from '../../components/HelloWorld';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <img alt="Vue logo" src={Logo} width="200" height="200" />
        <HelloWorld msg="Welcome to Your React.js App" />
      </div>
    );
  }
}

export default Home;
