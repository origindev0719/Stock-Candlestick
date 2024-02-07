import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FacebookProvider appId="1335243807079568">
    <GoogleOAuthProvider clientId="569740891127-2uci2vj1kud0hgr8ohjr4uo3rbmbvhhb.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </FacebookProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
