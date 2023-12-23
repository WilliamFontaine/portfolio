import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./App.scss";
import fr_translation from "./locales/fr.json";
import en_translation from "./locales/en.json";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr_translation },
    en: { translation: en_translation }
  },
  lng: "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>,
)
