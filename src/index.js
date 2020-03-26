import React from 'react';
import ReactDOM from 'react-dom';
import './global.styles.css';
import App from './App';
import ContextProvider from './context';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
