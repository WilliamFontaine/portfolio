import './Projects.scss';

function Projects() {
  return (
    <div id="projects" className="projects">
      <div className="title-container">
        <h2 className="title">projets</h2>
      </div>
      <div className="projects-container">
        <div className="project">
          <img
            src="/logo/github_logo.png"
            alt="github_logo"
            className="project-logo logo rounded"
          />
          <p className="project-title">Projets sur GitHub</p>
          <p className="project-desc">
            <span>
              <p>Vous pouvez retrouver tous mes projets sur mon GitHub.</p>
              <p>
                Je travaille sur des projets personnels et des projets
                scolaires.
              </p>
            </span>
          </p>
        </div>
        <div className="project">
          <img
            src="/logo/gitlab_logo.png"
            alt="gitlab_logo"
            className="project-logo logo rounded"
          />
          <p className="project-title">Projets sur GitLab</p>
          <p className="project-desc">
            <span>
              <p>
                Vous pouvez notamment retrouver le projet Gabbler sur mon
                GitLab.
              </p>
              <p>
                Ce projet est un réseau social développé en VueJS et Laravel.
              </p>
              <p>
                Ce projet à été réalisé en groupe de 4 personnes, dans le cadre
                de la formation de Concepteur développeur d'applications à
                Hesias.
              </p>
              <p>J'étais le chef de projet de ce groupe.</p>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
