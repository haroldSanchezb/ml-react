import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styles from './index.scss';

let root = document.querySelector('#root');
root.className = styles.container;
ReactDOM.render(<App />, root);
