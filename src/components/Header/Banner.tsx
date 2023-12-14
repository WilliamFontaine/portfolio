import './Banner.scss';

function Banner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="firstname">
          <img src="/images/bubble.png"
            alt="bubble"
            className='bubble' />
          <p className="firstname">William</p>
        </div>
        <div className='info'>
          <p className="lastname">Fontaine</p>
          <p className="desc">Développeur full stack.</p>
        </div>
      </div>
    </div>
  )
}

export default Banner;
