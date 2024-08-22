// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Container/App';
import './index.css';
import { store } from './Storage';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Uygulamanın kök bileşenini (App) DOM'a bağlıyoruz
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <Provider store = {store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>

);
