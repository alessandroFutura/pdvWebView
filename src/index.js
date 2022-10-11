import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { CustomProvider } from 'rsuite';
import ptBR from 'rsuite/locales/pt_BR';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <CustomProvider locale={ptBR}>
    <App/>
  </CustomProvider>
  // </React.StrictMode>
);

