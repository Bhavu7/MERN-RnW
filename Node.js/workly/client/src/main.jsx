import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f172a',
              color: '#e2e8f0',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '18px',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);