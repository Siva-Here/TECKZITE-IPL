import { useState, useEffect, useRef } from 'react';
import './Carouselcss.css';

const Carousel = ({ images, interval=3000  }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(goToNext, interval);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const handleMouseEnter = () => {
    stopAutoSlide();
  };

  const handleMouseLeave = () => {
    startAutoSlide();
  };

  return (
    <div
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
    >
      <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
      <button className="carousel-control prev" onClick={goToPrevious}>&#10094;</button>
      <button className="carousel-control next" onClick={goToNext}>&#10095;</button>
    </div>
  );
};

export default Carousel;
