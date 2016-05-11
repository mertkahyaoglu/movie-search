import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'root/store';
import routeConfig from 'root/routes';

render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routeConfig } />
  </Provider>,
  document.getElementById('root')
);
