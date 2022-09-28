import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "William Fontaine,",
      title_desc: "Junior web developer.",
      introduction_first:
        "Hi ! My name is William Fontaine, I'm 20 years old and I'm a junior web developer.",
      introduction_second:
        "I am passionate about IT and very curious, which allows me to discover " +
        "many new things, especially about new technologies and in the IT world.",
      exp_title: "My experiences",
      first_exp_date: "April 2022 - June 2022",
      first_exp_job: "Web developer trainee",
      first_exp_location: "Volvic, Auvergne-Rhône-Alpes, France",
      second_exp_date: "September 2022 - Now",
      second_exp_job: "Work-study student application designer and developer",
      second_exp_location: "Clermont-Ferrand, Auvergne-Rhône-Alpes, France",
      skills_title: "My skills",
      games_title: "Would you like to play a mini game ??",
      game_tictactoe: "TicTacToe",
      contact_title: "Contact me",
      contact_name: "Your name",
      contact_email: "Your mail",
      contact_message: "Your message",
      contact_message_placeholder:
        "Hey! Is this portfolio really made in React?",
      contact_button: "Send",
      footer_title: "Directed by William Fontaine with ❤️ .",
    },
  },
  fr: {
    translation: {
      title: "William Fontaine,",
      title_desc: "Développeur web junior.",
      introduction_first:
        "Hello ! Je m'appelle William Fontaine, j'ai 20 ans et je suis développeur web junior.",
      introduction_second:
        " Je suis passionné par l'informatique et très curieux, ce qui me " +
        "permet de découvrir plein de nouvelles choses, notamment dans le " +
        "domaine des nouvelles technologies et dans le monde de l'IT.",
      exp_title: "Mes expériences",
      first_exp_date: "Avril 2022 - Juin 2022",
      first_exp_job: "Stagiaire développeur web",
      first_exp_location: "Volvic, Auvergne-Rhône-Alpes, France",
      second_exp_date: "Septembre 2022 - Actuellement",
      second_exp_job: "Alternant concepteur et développeur d'applications",
      second_exp_location: "Clermont-Ferrand, Auvergne-Rhône-Alpes, France",
      skills_title: "Mes compétences",
      games_title: "Une envie de mini-jeux ??",
      game_tictactoe: "Morpion",
      contact_title: "Me contacter",
      contact_name: "Votre nom",
      contact_email: "Votre email",
      contact_message: "Votre message",
      contact_message_placeholder:
        "Hey ! ce portfolio est-il vraiment fait en React ?",
      contact_button: "Envoyer",
      footer_title: "Réalisé par William Fontaine avec ❤️️.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
