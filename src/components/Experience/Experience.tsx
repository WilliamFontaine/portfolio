
import "./Experience.scss";

function Experience() {
  return (
    <div id="experience" className="experience">
      <h1>Experience</h1>
      <div className="parent">
        <div className="second-experience experience-container container">
          <div className="company">
            <img src="/logo/neo_logix_logo.jpeg"
              alt="neo_logix_logo"
              className="company-logo" />
            <p className="company-name">NEO-FUGU®</p>
          </div>
          <div className="job">
            <p className="job-title">Développeur Web Full Stack.</p>
            <p className="job-date"><span className="date">Septembre 2022</span> - <span className="date">Aujourd'hui</span></p>
            <p className="job-desc">
              <span>
                <p>Je suis engagé dans plusieurs projets internes dédiés au développement d'applications web pour les bijoutiers.</p>
                <p>Mes responsabilités englobent le développement de ces initiatives, la résolution de bugs, ainsi que la création de nouvelles fonctionnalités.</p>
                <p>Ces tâches sont menées au sein d'une équipe d'environ 10 personnes, en collaboration étroite avec d'autres départements de l'entreprise.</p>
                <p>Concernant les outils technologiques, nous utilisons principalement Spring Boot & Angular pour ces projets.</p>
              </span>

            </p>
          </div>
        </div>
        <div className="first-experience experience-container container">
          <div className="company">
            <img src="/logo/itarverne_logo.jpeg"
              alt="neo_logix_logo"
              className="company-logo" />
            <p className="company-name">ITArverne</p>
          </div>
          <div className="job">
            <p className="job-title">Développeur Web.</p>
            <p className="job-date"><span className="date">Avril 2022</span> - <span className="date">Juin 2022</span></p>
            <p className="job-desc">
              <span>
                <p>J'ai ajouté la fonctionnalité suivante au blog de l’entreprise ITarverne déjà existant :</p>
                <p>permettre le post automatique de promotion de l’article que l’on poste sur le blog sur Twitter et LinkedIn,</p>
                <p>avec les technologies Python, Django et Wagtail.</p>
              </span>

              <span>
                <p>J'ai travaillé sur un second projet React. J'ai corrigé u n chat en direct qui existait mais n'était plus fonctionnel.</p>
                <p>J'ai aussi repris un autre projet avec la même stack technique, qui permettait de rapporter des bugs à l'équipe de maintenance du site.</p>
                <p>J'ai relié ces deux projets, je les ai installés dans un container Docker. Le chat est une application node.js,</p>
                <p>qui utilise des sockets et écoute les requêtes envoyées par le site.</p>
                <p>Ce nouveau projet fonctionne avec l'application Keybase.</p>
              </span>
            </p>
          </div>
        </div>
        <div className="div3 container"> </div>
        <div className="div4 container"> </div>
        <div className="div5 container"> </div>
        <div className="div6 container"> </div>
      </div>
    </div >
  );
}

export default Experience;
