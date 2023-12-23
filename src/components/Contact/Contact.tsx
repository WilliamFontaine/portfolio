import { FormEventHandler, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "./Contact.scss";

const userPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

function Contact() {
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init(userPublicKey);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstname = data.get("firstname")?.toString();
    const lastname = data.get("lastname")?.toString();
    const email = data.get("email")?.toString();
    const message = data.get("message")?.toString();

    if (!firstname || !lastname || !email || !message) {
      toast.error("Veuillez remplir tous les champs du formulaire");
      return;
    }

    toast.promise(sendEmail({ firstname, lastname, email, message }), {
      pending: "Envoi du message en cours...",
      success: "Votre message a bien été envoyé",
      error: "Une erreur est survenue lors de l'envoi du message",
    });
  };

  const sendEmail = ({
    firstname,
    lastname,
    email,
    message,
  }: {
    firstname: string;
    lastname: string;
    email: string;
    message: string;
  }): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      emailjs
        .send(serviceId, templateId, {
          firstname,
          lastname,
          email,
          message,
        })
        .then(
          (response) => {
            resolve(response);
            form.current?.reset();
          },
          (error) => {
            reject(error);
          }
        );
    });
  };

  return (
    <div id="contact" className="contact">
      <h1>Contact</h1>
      <div className="contact-form">
        <p>formulaire de contact</p>
        <form onSubmit={handleSubmit} ref={form}>
          <div className="form-group">
            <label htmlFor="name">Prénom</label>
            <input type="text" name="firstname" id="firstname" required />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input type="text" name="lastname" id="lastname" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" required />
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
      <div className="logo-container">
        <img
          src="/logo/linkedin_logo.png"
          alt="linkedin_logo"
          className="linkedin_logo logo"
        />
      </div>
    </div>
  );
}

export default Contact;
