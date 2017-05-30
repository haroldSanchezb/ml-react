import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from './App';
import styles from './index.scss';

let root = document.querySelector('#root');
root.className = styles.container;
ReactDOM.render(
  <IntlProvider locale={navigator.language}>
    <App />
  </IntlProvider>,
  root);
