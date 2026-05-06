import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react';

const ThreeDCarousel = ({ items, onPreview }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = React.useRef(null);

  React.useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleManualWheel = (e) => {
      // Force block page scroll
      e.preventDefault();
      
      if (Math.abs(e.deltaY) > 5) {
        if (e.deltaY > 0) {
          setActiveIndex((prev) => (prev + 1) % items.length);
        } else {
          setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        }
      }
    };

    el.addEventListener('wheel', handleManualWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleManualWheel);
  }, [items.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="carousel-3d-container" ref={carouselRef}>
      <div className="carousel-3d-stage">
        {items.map((item, index) => {
          // Calculate relative position to active index
          let position = index - activeIndex;
          if (position < -Math.floor(items.length / 2)) position += items.length;
          if (position > Math.floor(items.length / 2)) position -= items.length;

          const isActive = position === 0;
          const absPosition = Math.abs(position);
          
          // 3D Transforms
          const translateZ = isActive ? 0 : -150 * absPosition;
          const rotateY = position * -35;
          const translateX = position * 120;
          const opacity = Math.max(0, 1 - absPosition * 0.3);
          const zIndex = 10 - absPosition;

          return (
            <div
              key={index}
              className={`carousel-3d-card ${isActive ? 'active' : ''}`}
              onClick={() => isActive ? onPreview(item, index, items) : setActiveIndex(index)}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                cursor: isActive ? 'zoom-in' : 'pointer'
              }}
            >
              <div className="carousel-3d-card-inner glass-panel">
                <div className="card-image-container">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <Wrench size={20} className="brand-accent" />
                    <h3>{item.name}</h3>
                  </div>
                  {isActive && <p className="card-desc">{item.desc}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="carousel-3d-controls">
        <button onClick={prevSlide} className="carousel-control-btn">
          <ChevronLeft size={24} />
        </button>
        <div className="carousel-indicators">
          {items.map((_, i) => (
            <div 
              key={i} 
              className={`indicator ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="carousel-control-btn">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
