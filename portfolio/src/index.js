import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import i18n from "./i18n";

import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./components/Error/ErrorPage";
import { TicTacToeGame } from "./container/TicTacToeGame/TicTacToeGame";
import { HomePage } from "./container/HomePage/HomePage";
import { ParallaxProvider } from "react-scroll-parallax";
import { ThemeProvider } from "./store/ThemeStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "tictactoe",
    element: <TicTacToeGame />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ParallaxProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ParallaxProvider>
  </ThemeProvider>
);

reportWebVitals();
