import './Study.scss';

function Study() {
  return (
    <div id="study" className="study">
      <div className="title-container">
        <h2 className="title">formation</h2>
      </div>
      <div className="study-container">
        <div className="school">
          <img
            src="/logo/hesias_logo.jpeg"
            alt="hesias_logo"
            className="school-logo logo rounded"
          />
          <p className="school-name">Hesias</p>
        </div>

        <div className="study-content">
          <p className="study-title">Manager de projet informatique</p>
          <p className="study-date">
            <span className="date">Octobre 2023</span> -{' '}
            <span className="date">Septembre 2025</span>
          </p>
          <p className="study-desc">
            <span>
              <p>
                Je suis actuellement en formation de Manager de projet
                informatique à Hesias.
              </p>
              <p>Je suis en alternance chez NEO-FUGU®.</p>
            </span>
          </p>
        </div>
      </div>

      <div className="study-container">
        <div className="school">
          <img
            src="/logo/hesias_logo.jpeg"
            alt="hesias_logo"
            className="school-logo logo rounded"
          />
          <p className="school-name">Hesias</p>
        </div>
        <div className="study-content">
          <p className="study-title">Concepteur développeur d'applications</p>
          <p className="study-date">
            <span className="date">Septembre 2022</span> -{' '}
            <span className="date">Octobre 2023</span>
          </p>
          <p className="study-desc">
            <span>
              <p>
                Je suis diplômé de la formation de Concepteur développeur
                d'applications à Hesias.
              </p>
              <p>J'ai été major de promotion durant cette formation.</p>
              <p>J'était en alternance chez NEO-FUGU®.</p>
            </span>
          </p>
        </div>
      </div>

      <div className="study-container">
        <div className="school">
          <img
            src="/logo/uca_logo.jpeg"
            alt="uca_logo"
            className="school-logo logo rounded"
          />
          <p className="school-name">Université Clermont Auvergne</p>
        </div>

        <div className="study-content">
          <p className="study-title">
            Diplôme universitaire de technologie en informatique
          </p>
          <p className="study-date">
            <span className="date">Septembre 2020</span> -{' '}
            <span className="date">Juin 2022</span>
          </p>
          <p className="study-desc">
            <span>
              <p>
                Je suis diplômé du DUT Informatique à l'Université Clermont
                Auvergne.
              </p>
              <p>J'ai effectué mon stage de fin de cursus chez ITArverne.</p>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Study;
