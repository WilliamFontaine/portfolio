import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./Popus.css";

export function Popus({ message, className }) {
  return (
    <div className={className} id="popup">
      <FaSpinner className="popup-spinner" />
      {message}
    </div>
  );
}
