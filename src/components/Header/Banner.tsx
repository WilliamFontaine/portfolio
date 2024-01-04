import { useTranslation } from 'react-i18next';
import './Banner.scss';

function Banner() {
  const { t } = useTranslation();

  return (
    <div className="banner">
      <div className="banner-content">
        <div className="firstname">
          <img src="/images/bubble.png" alt="bubble" className="bubble" />
          <p className="firstname">{t('banner.firstname')}</p>
        </div>
        <div className="info">
          <p className="lastname">{t('banner.lastname')}</p>
          <p className="desc">{t('banner.desc')}</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
