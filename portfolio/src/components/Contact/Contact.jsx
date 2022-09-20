import React, {useRef} from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

export function Contact() {
  const form = useRef();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

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
        <p className="contact-header__title">Me concater</p>
      </div>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="contact-form__row">
          <div className="contact-form__col-25">
            <label className="contact-form__label" htmlFor="name">
              Votre nom
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
              Votre email
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
              Votre message
            </label>
          </div>
          <div className="contact-form__col-75">
            <textarea
              className="contact-form__text"
              placeholder="Hey ! ce portfolio est-il vraiment fait en React ?"
              name="message"
              id="message"
              rows="10"
              ref={messageRef}
              required
            />
          </div>
        </div>
        <input type="submit" value="Envoyer" className="contact-form__submit"/>
      </form>
    </div>
  );
}
