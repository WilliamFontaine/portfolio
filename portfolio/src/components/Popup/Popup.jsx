import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Popus.css";

export function Popus({ message, className }) {
  return (
    <div className={className} id="popup">
      <FontAwesomeIcon icon={faSpinner} className="popup-spinner" />
      {message}
    </div>
  );
}
