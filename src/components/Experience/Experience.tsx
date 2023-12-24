import './Experience.scss';

function Experience() {
  return (
    <div id="experience" className="experience">
      <div className="title-container">
        <h2 className="title">expérience</h2>
      </div>
      <div className="parent">
        <div className="second-experience experience-container container">
          <div className="company">
            <img
              src="/logo/neo_logix_logo.jpeg"
              alt="neo_logix_logo"
              className="company-logo logo rounded"
            />
            <p className="company-name">NEO-FUGU®</p>
          </div>
          <div className="job">
            <div className="job-entitle">
              <p className="job-title">Développeur Web Full Stack</p>
              <p className="job-date">
                <span className="date">Juin 2021</span> -{' '}
                <span className="date">Aujourd'hui</span>
              </p>
            </div>
            <div className="job-desc">
              <ul>
                <li>
                  <p>
                    Je suis engagé dans plusieurs projets internes dédiés au
                    développement d'applications web pour les bijoutiers.
                  </p>
                </li>
                <li>
                  <p>
                    Mes responsabilités englobent le développement de ces
                    initiatives, la résolution de bugs, ainsi que la création de
                    nouvelles fonctionnalités.
                  </p>
                </li>
                <li>
                  <p>
                    Ces tâches sont menées au sein d'une équipe d'environ 10
                    personnes, en collaboration étroite avec d'autres
                    départements de l'entreprise.
                  </p>
                </li>
                <li>
                  <p>
                    Concernant les outils technologiques, nous utilisons
                    principalement Spring Boot & Angular pour ces projets.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="first-experience experience-container container">
          <div className="company">
            <img
              src="/logo/itarverne_logo.jpeg"
              alt="neo_logix_logo"
              className="company-logo logo rounded"
            />
            <p className="company-name">ITArverne</p>
          </div>
          <div className="job">
            <div className="job-entitle">
              <p className="job-title">Développeur Web</p>
              <p className="job-date">
                <span className="date">Avril 2021</span> -{' '}
                <span className="date">Juin 2021</span>
              </p>
            </div>
            <div className="job-desc">
              <ul>
                <li>
                  <p>
                    J'ai travaillé sur un projet React, qui permettait de
                    rapporter des bugs à l'équipe de maintenance du site.
                  </p>
                </li>
                <li>
                  <p>
                    J'ai relié ce projet à un autre projet existant, qui était
                    un chat en direct, mais qui n'était plus fonctionnel.
                  </p>
                </li>
                <li>
                  <p>
                    J'ai installé ces deux projets dans un container Docker.
                  </p>
                </li>
                <li>
                  <p>
                    Le chat est une application node.js, qui utilise des sockets
                    et écoute les requêtes envoyées par le site.
                  </p>
                </li>
                <li>
                  <p>
                    Ce nouveau projet fonctionne avec l'application Keybase.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="div3 container"> </div>
        <div className="div4 container"> </div>
        <div className="div5 container"> </div>
        <div className="div6 container"> </div>
        <div className="div7 container"> </div>
      </div>
    </div>
  );
}

export default Experience;
