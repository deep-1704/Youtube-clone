import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='144995126361-34vs5cm03mh25vqjeknamqffvuksgb1c.apps.googleusercontent.com' >
    <React.StrictMode>
      <ChakraProvider><App /></ChakraProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
reportWebVitals();
