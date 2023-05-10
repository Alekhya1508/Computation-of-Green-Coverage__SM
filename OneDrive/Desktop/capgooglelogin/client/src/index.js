import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./global.css";
import App from './App';

import { Provider } from 'react-redux';
import { reducers } from "./redux/reducers"
import thunk from "redux-thunk"
import {BrowserRouter} from "react-router-dom"
import { createStore, applyMiddleware, compose} from "redux"
import {GoogleOAuthProvider} from "@react-oauth/google"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <GoogleOAuthProvider
                clientId="521823157234-kpbrmhogme9ktp4nn1uf3kdcu5ucqd3c.apps.googleusercontent.com">
       <App />
       </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();


