import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react'

const VITE_CLERK_PUBLISHABLE_KEY="pk_test_a2V5LWhhcmUtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);

