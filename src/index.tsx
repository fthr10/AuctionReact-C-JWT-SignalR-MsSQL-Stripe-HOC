// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Container/App';
import './index.css';
import { store } from './Storage';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Uygulamanın kök bileşenini (App) DOM'a bağlıyoruz
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <Provider store = {store}>
    <BrowserRouter>
    <ToastContainer></ToastContainer>
    <App />
    </BrowserRouter>
  </Provider>

);
