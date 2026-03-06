// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // 👈 App보다 먼저 오거나 바로 다음에 오는지 확인!
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)