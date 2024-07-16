import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalProvider } from "./context/globalContext";
import { AuthContextProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <GlobalProvider>
        <App />
    </GlobalProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
