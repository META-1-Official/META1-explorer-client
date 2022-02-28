import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import {StylesProvider} from '@mui/styles';
import { theme } from './styles/mui';

import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
            <App />
        </ ThemeProvider>
      </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
