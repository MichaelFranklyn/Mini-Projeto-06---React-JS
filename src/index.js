import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainRotas from './routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRotas />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);