import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Font from './FontTest.jsx'
import Login from "./components/Login";
import HomeView from './view/HomeView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
