import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
    domain="{process.env.AUTH0_ISSUER_BASE_URL}"
    clientId="{process.env.AUTH0_CLIENT_ID}"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    <App />
  </Auth0Provider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
