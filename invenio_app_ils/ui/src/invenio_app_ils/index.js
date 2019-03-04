import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-app-polyfill/ie11'; // For IE 11 support
import App from './App';
import store from './store';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';
import { SemanticToastContainer } from 'react-semantic-toasts';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <SemanticToastContainer />
  </Provider>,
  document.getElementById('app')
);
