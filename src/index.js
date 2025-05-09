// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.js";
import { AppWrapper } from "./components/common/PageMeta.js";
import { ThemeProvider } from "./context/ThemeContext.js";
import { CartProvider } from './context/CartContext.js';
import { StoreProvider } from './context/StoreContext.js';
import { GoodRequestProvider } from './context/GoodRequestContext.js';

const root = createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider>
    <AppWrapper>
      <StoreProvider>
        <CartProvider>
          <GoodRequestProvider>
            <App />
          </GoodRequestProvider>
        </CartProvider>
      </StoreProvider>
    </AppWrapper>
  </ThemeProvider>
);
