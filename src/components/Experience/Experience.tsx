import { useTranslation } from 'react-i18next';
import './Experience.scss';

function Experience() {
  const { t } = useTranslation();

  return (
    <div id="experience" className="experience">
      <div className="title-container">
        <h2 className="title">{t('experience.title')}</h2>
      </div>
      <div className="parent">
        <div className="second-experience experience-container container">
          <div className="company">
            <img
              src="/logo/neo_logix_logo.jpeg"
              alt="neo_logix_logo"
              className="company-logo logo rounded"
            />
            <p className="company-name">{t('experience.list.1.company')}</p>
          </div>
          <div className="job">
            <div className="job-entitle">
              <p className="job-title">{t('experience.list.1.title')}</p>
              <p className="job-date">
                <span className="date">{t('experience.list.1.date.from')}</span>{' '}
                - <span className="date">{t('experience.list.1.date.to')}</span>
              </p>
            </div>
            <div className="job-desc">
              <ul>
                <li>
                  <p>{t('experience.list.1.desc.1')}</p>
                </li>
                <li>
                  <p>{t('experience.list.1.desc.2')}</p>
                </li>
                <li>
                  <p>{t('experience.list.1.desc.3')}</p>
                </li>
                <li>
                  <p>{t('experience.list.1.desc.4')}</p>
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
            <p className="company-name">{t('experience.list.2.company')}</p>
          </div>
          <div className="job">
            <div className="job-entitle">
              <p className="job-title">{t('experience.list.2.title')}</p>
              <p className="job-date">
                <span className="date">{t('experience.list.2.date.from')}</span>{' '}
                - <span className="date">{t('experience.list.2.date.to')}</span>
              </p>
            </div>
            <div className="job-desc">
              <ul>
                <li>
                  <p>{t('experience.list.2.desc.1')}</p>
                </li>
                <li>
                  <p>{t('experience.list.2.desc.2')}</p>
                </li>
                <li>
                  <p>{t('experience.list.2.desc.3')}</p>
                </li>
                <li>
                  <p>{t('experience.list.2.desc.4')}</p>
                </li>
                <li>
                  <p>{t('experience.list.2.desc.5')}</p>
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
