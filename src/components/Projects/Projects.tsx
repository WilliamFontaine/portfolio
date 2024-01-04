import { useTranslation } from 'react-i18next';
import './Projects.scss';

function Projects() {
  const { t } = useTranslation();

  return (
    <div id="projects" className="projects">
      <div className="title-container">
        <h2 className="title">{t('projects.title')}</h2>
      </div>
      <div className="projects-container">
        <div className="project">
          <img
            src="/logo/github_logo.png"
            alt="github_logo"
            className="project-logo logo rounded"
          />
          <p className="project-title">{t('projects.list.1.title')}</p>
          <div className="project-desc">
            <span>
              <p>{t('projects.list.1.desc.1')}</p>
              <p>{t('projects.list.1.desc.2')}</p>
            </span>
          </div>
        </div>
        <div className="div1 container"></div>
        <div className="project">
          <img
            src="/logo/gitlab_logo.png"
            alt="gitlab_logo"
            className="project-logo logo rounded"
          />
          <p className="project-title">{t('projects.list.2.title')}</p>
          <div className="project-desc">
            <span>
              <p>{t('projects.list.2.desc.1')}</p>
              <p>{t('projects.list.2.desc.2')}</p>
              <p>{t('projects.list.2.desc.3')}</p>
              <p>{t('projects.list.2.desc.4')}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
