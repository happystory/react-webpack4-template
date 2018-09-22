import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import './App.scss';

import appState from './store/app-state';

ReactDOM.render(
  <Provider appState={appState}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('app'),
);
