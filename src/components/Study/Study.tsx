import { useTranslation } from 'react-i18next';
import './Study.scss';

function Study() {
  const { t } = useTranslation();

  return (
    <div id="study" className="study">
      <div className="title-container">
        <h2 className="title">{t('study.title')}</h2>
      </div>
      <div className="studies">
        <div className="study-container">
          <div className="school">
            <img
              src="/logo/hesias_logo.jpeg"
              alt="hesias_logo"
              className="school-logo logo rounded"
            />
            <p className="school-name">{t('study.list.1.school')}</p>
          </div>

          <div className="study-content">
            <p className="study-title">{t('study.list.1.title')}</p>
            <p className="study-date">
              <span className="date">{t('study.list.1.date.from')}</span> -{' '}
              <span className="date">{t('study.list.1.date.to')}</span>
            </p>
            <div className="study-desc">
              <span>
                <p>{t('study.list.1.desc.1')}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="study-container">
          <div className="school">
            <img
              src="/logo/hesias_logo.jpeg"
              alt="hesias_logo"
              className="school-logo logo rounded"
            />
            <p className="school-name">{t('study.list.2.school')}</p>
          </div>
          <div className="study-content">
            <p className="study-title">{t('study.list.2.title')}</p>
            <p className="study-date">
              <span className="date">{t('study.list.2.date.from')}</span> -{' '}
              <span className="date">{t('study.list.2.date.to')}</span>
            </p>
            <div className="study-desc">
              <span>
                <p>{t('study.list.2.desc.1')}</p>
                <p>{t('study.list.2.desc.2')}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="study-container">
          <div className="school">
            <img
              src="/logo/uca_logo.jpeg"
              alt="uca_logo"
              className="school-logo logo rounded"
            />
            <p className="school-name">{t('study.list.3.school')}</p>
          </div>

          <div className="study-content">
            <p className="study-title">{t('study.list.3.title')}</p>
            <p className="study-date">
              <span className="date">{t('study.list.3.date.from')}</span> -{' '}
              <span className="date">{t('study.list.3.date.to')}</span>
            </p>
            <div className="study-desc">
              <span>
                <p>{t('study.list.3.desc.1')}</p>
                <p>{t('study.list.3.desc.2')}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="div1 container"> </div>
        <div className="div2 container"> </div>
      </div>
    </div>
  );
}

export default Study;
