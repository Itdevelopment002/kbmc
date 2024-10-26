import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import logo1 from '../../assets/images/footerlogo/01.png';
import logo2 from '../../assets/images/footerlogo/02.png';
import logo3 from '../../assets/images/footerlogo/03.png';
import logo4 from '../../assets/images/footerlogo/04.png';
import logo5 from '../../assets/images/footerlogo/05.png';
import logo6 from '../../assets/images/footerlogo/06.png';
import logo7 from '../../assets/images/footerlogo/07.png';
import logo8 from '../../assets/images/footerlogo/08.png';
import './BottomSlider.css'


// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-next-arrow" onClick={onClick}>
      <FaChevronRight size={15} />
    </div>
  );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
      <FaChevronLeft size={15} />
    </div>
  );
};

const BottomSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          className: 'slider-padding',
        },
      },
    ],
  };

  return (
    <section className="client-logo-slider my-3">
      <div className="content-box">
        <div className="inner-box">
          <Slider {...settings}>
            {[logo5, logo1, logo6, logo7, logo8, logo1, logo2, logo3, logo4].map((logo, index) => (
              <div key={index}  className="logo-slide">
                <a href={getLogoLink(index)} target="_blank" rel="noopener noreferrer">
                  <img src={logo} alt={`logo-${index + 1}`} />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

const getLogoLink = (index) => {
  const links = [
    'https://www.mpcb.gov.in/',
    'https://divcomkonkan.gov.in/',
    'https://aaplesarkar.mahaonline.gov.in/',
    'https://thane.nic.in/',
    'https://www.eci.gov.in/',
    'https://urban.maharashtra.gov.in/',
    'https://www.mygov.in/',
    'https://www.midcindia.org/',
    'https://mmrda.maharashtra.gov.in/',
  ];
  return links[index % links.length];
};

export default BottomSlider;
