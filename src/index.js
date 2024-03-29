import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Main } from '@aragon/ui';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import toDoReducer from "./reducers/toDoReducer";

const store = createStore(toDoReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Main publicUrl="/aragon-ui/">
      <App />
    </Main>
  </Provider> , document.getElementById('root')
);

serviceWorker.unregister();