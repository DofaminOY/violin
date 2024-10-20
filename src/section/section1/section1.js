import React, { useState, useEffect } from 'react';

import './section1.css';

function Section1() {
  const [hoveredBox, setHoveredBox] = useState(null);

  // Додаємо ефект для відслідковування зміни ширини екрану
  useEffect(() => {
    // Функція очищення стану при зміні розміру
    const handleResize = () => {
      setHoveredBox(null); // Скидаємо стан до початкового
    };

    // Додаємо обробник події resize
    window.addEventListener('resize', handleResize);

    // Прибираємо обробник події при розмонтуванні компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Розбиваємо текст на масив слів
  const text = 'The music of the soul and the inspiration of the spring wind....';
  const splitTextToSpans = text.split(' ').map((word, index) => (
    <span key={index} style={{ '--i': index }}>
      {word}
     
      {index < text.split(' ').length - 1 && '\u00A0'}
    </span>
  ));

  const box1Styles = {
    backgroundColor: '#C8B8A5',
    backgroundImage: 'url("/photo/3.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: '3%',
    left: '0',
    width: '90%',
    height: '90%',
    zIndex: hoveredBox === 'box-1' ? 3 : 1,
    transition: 'all 0.5s ease',
    opacity: hoveredBox === 'box-2' ? 0 : 1,
    borderRadius: '0% 20% 0% 20%',
    overflow: 'hidden',
    marginTop: '5%',
    marginLeft: '10%',
    // Додаємо початкову трансформацію
    transform: hoveredBox === 'box-1' ? 'scale(1.1)' : 'scale(1)',
  };

  const box2Styles = {
    backgroundColor: '#A6927E',
    backgroundImage: 'url("/photo/2.jpg")', // Використовуємо відносний шлях до зображення в межах проєкту
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: '47%',
    left: hoveredBox === 'box-2' ? '0' : '-10%',
    width: hoveredBox === 'box-2' ? '90%' : '50%',
    height: hoveredBox === 'box-2' ? '90%' : '50%',
    zIndex: hoveredBox === 'box-2' ? 3 : 2,
    transform: 'translateY(-50%)',
    transition: 'all 0.5s ease',
    opacity: hoveredBox === 'box-1' ? 0 : 1,
    borderRadius: '20% 0px 20% 0px',
    overflow: 'hidden',
    marginTop: '10%',
    marginLeft: '5%',
  };

  return (
    <div className="section section-1">
      <div className="hero-section">
        <div className="hero-text">
          <p>{splitTextToSpans}</p>
        </div>

        <div 
          className="hero-image"
          onMouseEnter={() => setHoveredBox('box-1')}
          onMouseLeave={() => setHoveredBox(null)}
          onTouchStart={(e) => {
            // Зупиняємо подальше спливання події
            e.stopPropagation();
          }}
          onTouchEnd={() => {
            // Не очищаємо стан для жодного активного боксу
          }}
        >
          <div className="photo-container">
            <div
              style={box1Styles}
              onMouseEnter={() => setHoveredBox('box-1')}
              onTouchStart={(e) => {
                e.stopPropagation(); // Зупиняємо спливання події
                // Якщо box-1 активний, деактивуємо, інакше активуємо його
                setHoveredBox((prev) => (prev === 'box-1' ? null : 'box-1'));
              }}
            ></div>
            <div
              style={box2Styles}
              onMouseEnter={() => setHoveredBox('box-2')}
              onTouchStart={(e) => {
                e.stopPropagation(); // Зупиняємо спливання події
                // Завжди активуємо box-2 при тапі на нього
                setHoveredBox((prev) => (prev === 'box-2' ? null : 'box-2'));
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
