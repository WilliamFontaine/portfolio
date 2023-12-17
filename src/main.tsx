import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./App.scss";
import fr_translation from "./locales/fr.json";
import en_translation from "./locales/en.json";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
  </React.StrictMode>,
)
