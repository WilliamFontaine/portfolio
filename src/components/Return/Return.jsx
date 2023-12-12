import React from "react";
import "./Return.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export function Return() {
  return (
    <Link to={"/"}>
      <div className="return">
        <FaArrowLeft className="icon-arrow-left" />
      </div>
    </Link>
  );
}
