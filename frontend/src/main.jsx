import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Apply saved theme on load
const savedSettings = localStorage.getItem('infinityQuizSettings');
if (savedSettings) {
  const { theme } = JSON.parse(savedSettings);
  if (theme) document.documentElement.setAttribute('data-theme', theme);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
