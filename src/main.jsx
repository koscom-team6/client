import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Font from './FontTest.jsx'
import Login from "./components/Login";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Font/>
  </StrictMode>,
)
