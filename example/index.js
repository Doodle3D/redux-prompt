import 'babel-polyfill'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { middleware as promptMiddleware, reducer as promptReducer, initialState as initialPromptState } from '../src/index.js';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
const enhancer = compose(applyMiddleware(promptMiddleware()));
const reducer = combineReducers({ prompt: promptReducer });
const initialState = { prompt: initialPromptState };
const store = createStore(reducer, initialState, enhancer);

import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { component as Prompt } from '../src/index.js';
render((
  <Provider store={store}>
    <MuiThemeProvider>
      <span>
        <Prompt />
        <App />
      </span>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('app'));
