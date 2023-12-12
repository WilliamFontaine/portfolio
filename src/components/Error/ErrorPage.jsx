import { useRouteError } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRef } from "react";
import NotFound from "../../images/ErrorNotFound.json";
import "./ErrorPage.css";
import { useTranslation } from "react-i18next";
import { Return } from "../Return/Return";

export default function ErrorPage() {
  const error = useRouteError();
  const player = useRef();
  const { t } = useTranslation();

  return (
    <div className="error-page">
      <Return />
      <div className="error-page__right">
        <div className="error-page__animation">
          <Player ref={player} autoplay={true} loop={true} src={NotFound} />
        </div>
      </div>
      <div className="error-page__left">
        <div className="error-page__info">
          <p className="title">{t("error")}</p>
          <span className="error-code glitch" data-text={error.status}>
            {error.status}
          </span>
          <span className="error-statusText"> {error.statusText}.</span>
          <p className="error">{t("error_message")}</p>
        </div>
      </div>
    </div>
  );
}
