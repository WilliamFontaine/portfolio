import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import { useTranslation } from "react-i18next";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { Popus } from "../Popup/Popup";

export function Contact() {
  const form = useRef();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const { t } = useTranslation();

  const sendEmail = (e) => {
    if (
      nameRef.current.value !== "" &&
      emailRef.current.value !== "" &&
      messageRef.current.value !== ""
    ) {
      emailjs
        .sendForm(
          "service_3cz2rke",
          "template_9y3kqsb",
          form.current,
          "wM_Pk2WkEQ2xB60ip"
        )
        .then(
          (result) => {
            e.target.reset();
            nameRef.current.value = "";
            emailRef.current.value = "";
            messageRef.current.value = "";
            document
              .querySelector(".modal-succes")
              .classList.add("modal-succes-animation");
            setTimeout(function () {
              document
                .querySelector(".modal-succes")
                .classList.remove("modal-succes-animation");
            }, 6000);
            document.querySelector(".user_captcha_input").value = "";
          },
          (error) => {
            document
              .querySelector(".modal-fail")
              .classList.add("modal-fail-animation");
            setTimeout(function () {
              document
                .querySelector(".modal-fail")
                .classList.remove("modal-fail-animation");
            }, 6000);
            document.querySelector(".user_captcha_input").value = "";
          }
        );
    } else {
      document
        .querySelector(".modal-fail")
        .classList.add("modal-fail-animation");
      setTimeout(function () {
        document
          .querySelector(".modal-fail")
          .classList.remove("modal-fail-animation");
      }, 6000);
      document.querySelector(".user_captcha_input").value = "";
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(8);
  });

  const doSubmit = (e) => {
    let user_captcha = document.querySelector(".user_captcha_input").value;

    if (validateCaptcha(user_captcha) === true) {
      loadCaptchaEnginge(6);
      document.querySelector(".user_captcha_input").value = "";
      sendEmail(e);
    } else {
      document
        .querySelector(".modal-captcha")
        .classList.add("modal-captcha-animation");
      document.querySelector(".user_captcha_input").value = "";
      setTimeout(function () {
        document
          .querySelector(".modal-captcha")
          .classList.remove("modal-captcha-animation");
      }, 6000);
    }
    e.preventDefault();
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <p className="contact-header__title">{t("contact_title")}</p>
      </div>
      <form ref={form} onSubmit={doSubmit} className="contact-form">
        <div className="contact-form__row">
          <div className="contact-form__col-25">
            <label className="contact-form__label" htmlFor="name">
              {t("contact_name")}
            </label>
          </div>
          <div className="contact-form__col-75">
            <input
              className="contact-form__name"
              type="text"
              placeholder="John Smith"
              name="user_name"
              id="name"
              ref={nameRef}
              // required
            />
          </div>
        </div>
        <div className="contact-form__row">
          <div className="contact-form__col-25">
            <label className="contact-form__label" htmlFor="email">
              {t("contact_email")}
            </label>
          </div>
          <div className="contact-form__col-75">
            <input
              className="contact-form__email"
              type="email"
              placeholder="john@smith.fr"
              name="user_email"
              id="email"
              ref={emailRef}
              // required
            />
          </div>
        </div>
        <div className="contact-form__row">
          <div className="contact-form__col-25">
            <label className="contact-form__label" htmlFor="message">
              {t("contact_message")}
            </label>
          </div>
          <div className="contact-form__col-75">
            <textarea
              className="contact-form__text"
              placeholder={t("contact_message_placeholder")}
              name="message"
              id="message"
              rows="10"
              ref={messageRef}
              // required
            />
          </div>
        </div>
        <div className="contact-form__captcha">
          <div className="contact-form__captcha-captcha">
            <LoadCanvasTemplateNoReload />
          </div>
          <div className="contact-form__captcha-help">
            Enter the captcha here :
          </div>
          <input
            placeholder="Enter Captcha Value"
            className="user_captcha_input"
            name="user_captcha_input"
            type="text"
          />
        </div>
        <input
          type="submit"
          value={t("contact_button")}
          className="contact-form__submit"
        />
      </form>
      <Popus message={t("contact_captcha")} className="modal-captcha" />
      <Popus message={t("contact_succes")} className="modal-succes" />
      <Popus message={t("contact_fail")} className="modal-fail" />
    </div>
  );
}
