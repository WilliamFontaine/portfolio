import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import { useTranslation } from "react-i18next";

export function Contact() {
  const form = useRef();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const { t } = useTranslation();

  const sendEmail = (e) => {
    e.preventDefault();

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
          console.log(result.text);
          nameRef.current.value = "";
          emailRef.current.value = "";
          messageRef.current.value = "";
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <p className="contact-header__title">{t("contact_title")}</p>
      </div>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
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
              required
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
              required
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
              required
            />
          </div>
        </div>
        <input
          type="submit"
          value={t("contact_button")}
          className="contact-form__submit"
        />
      </form>
    </div>
  );
}
