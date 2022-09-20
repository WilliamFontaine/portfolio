import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import "./Return.css";
import {Link} from "react-router-dom";

export function Return() {
  return (
    <Link to={"/"}>
      <div className="return">
        <FontAwesomeIcon icon={faArrowLeft} size="3x"/>
      </div>
    </Link>
  );
}
