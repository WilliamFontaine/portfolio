import { FormEventHandler, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import './Contact.scss';

const emailConfig = {
  userPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};

function Contact() {
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init(emailConfig.userPublicKey);
  }, []);

  const validateFormData = (data: FormData): boolean => {
    return ['firstname', 'lastname', 'email', 'message'].every(
      (field) => !!data.get(field)
    );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!validateFormData(data)) {
      toast.error('Veuillez remplir tous les champs du formulaire');
      return;
    }

    toast.promise(sendEmail(data), {
      pending: 'Envoi du message en cours...',
      success: 'Votre message a bien été envoyé',
      error: "Une erreur est survenue lors de l'envoi du message",
    });
  };

  const sendEmail = (data: FormData): Promise<unknown> => {
    const firstname = data.get('firstname');
    const lastname = data.get('lastname');
    const email = data.get('email');
    const message = data.get('message');

    console.log(firstname, lastname, email, message);

    return new Promise((resolve, reject) => {
      emailjs
        .send(emailConfig.serviceId, emailConfig.templateId, {
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
      <div className="title-container">
        <h2 className="title">contact</h2>
      </div>
      <div className="contact-form">
        <p>formulaire de contact</p>
        <form onSubmit={handleSubmit} ref={form}>
          <div className="form-group">
            <div className="label-container">
              <label htmlFor="firstname">Prénom</label>
            </div>
            <div className="input-container">
              <input type="text" name="firstname" id="firstname" required />
            </div>
          </div>
          <div className="form-group">
            <div className="label-container">
              <label htmlFor="lastname">Nom</label>
            </div>
            <div className="input-container">
              <input type="text" name="lastname" id="lastname" required />
            </div>
          </div>
          <div className="form-group">
            <div className="label-container">
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-container">
              <input type="email" name="email" id="email" required />
            </div>
          </div>
          <div className="form-group">
            <div className="label-container">
              <label htmlFor="message">Message</label>
            </div>
            <div className="input-container">
              <textarea name="message" id="message" required rows={5} />
            </div>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
      <div className="logo-container">
        <p> Me contacter aussi sur :</p>
        <a href="https://www.linkedin.com/in/williamftn/">
          <img
            src="/logo/linkedin_logo.png"
            alt="linkedin_logo"
            className="linkedin_logo logo"
          />
        </a>
        <a href="https://github.com/WilliamFontaine">
          <img
            src="/logo/github_logo.png"
            alt="github_logo"
            className="github_logo logo"
          />
        </a>
        <a href="https://gitlab.com/WilliamFontaine">
          <img
            src="/logo/gitlab_logo.png"
            alt="gitlab_logo"
            className="gitlab_logo logo"
          />
        </a>
      </div>
    </div>
  );
}

export default Contact;
