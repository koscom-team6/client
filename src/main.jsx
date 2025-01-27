import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/home/Login';
import HomeView from './MainLayout';
import MainLayout from './MainLayout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainLayout/>
  </StrictMode>,
);
