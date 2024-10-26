import React, { useRef } from "react";
import Slider from "react-slick";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import c1 from "../../assets/images/banner/1-1.jpg";
import c2 from "../../assets/images/banner/1-2.jpg";
import c3 from "../../assets/images/banner/1-3.jpg";
import c4 from "../../assets/images/banner/1-4.jpg";
import c5 from "../../assets/images/banner/1-5.jpg";
import c6 from "../../assets/images/banner/1-6.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Corousel.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true, 
};

const Corousel = () => {
  const sliderRef = useRef(null); 

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section className="banner-section">
      <div className="banner-carousel">
        <Slider ref={sliderRef} {...settings}>
          <div className="slide-item">
            <div className="image-layer" style={{ backgroundImage: `url(${c1})` }}></div>
          </div>
          <div className="slide-item">
            <div className="image-layer" style={{ backgroundImage: `url(${c2})` }}></div>
          </div>
          <div className="slide-item">
            <div className="image-layer" style={{ backgroundImage: `url(${c3})` }}></div>
          </div>
          <div className="slide-item">
            <div className="image-layer" style={{ backgroundImage: `url(${c4})` }}></div>
          </div>
          <div className="slide-item">
            <div className="image-layer" style={{ backgroundImage: `url(${c5})` }}></div>
          </div>
          <div className="slide-item">
            <div className="image-layer" style={{ backgroundImage: `url(${c6})` }}></div>
          </div>
        </Slider>
        <div className="owl-nav">
          <button type="button" className="owl-prev" onClick={goToPrev}>
            <GrPrevious className="nav-icon" size={17} /> 
          </button>
          <button type="button" className="owl-next" onClick={goToNext}>
            <GrNext className="nav-icon" size={17} /> 
          </button>
        </div>

      </div>
    </section>
  );
};

export default Corousel;
