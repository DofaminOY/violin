import React, { useState, useEffect, useRef } from 'react';
import './section2.css';

function Section2() {
  const [hoveredLine, setHoveredLine] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(0); // індекс поточного фото
  const [isCarouselActive, setIsCarouselActive] = useState(true); // карусель активна чи ні
  const [photos, setPhotos] = useState([]); // Масив фото з JSON
  const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка для пагінації
  const [visiblePhotos, setVisiblePhotos] = useState([]); // Відображені мініатюри (не більше 5)
  const [showIcon, setShowIcon] = useState(false); // Стан для відображення іконки
  const [iconType, setIconType] = useState('pause'); // Тип іконки (плей або пауза)
  const photoContainerRef = useRef(null); // Ссилка на головний контейнер з фото
  const iconsContainerRef = useRef(null); // Ссилка на контейнер з мініатюрами

  // Функція для запуску анімації тексту
  const handleMouseEnter = (line) => {
    setHoveredLine(line);
  };

  const handleMouseLeave = () => {
    setHoveredLine(null);
  };

  // Функція для завантаження фото з пагінацією
  const fetchPhotos = async (page = 1, limit = 30) => {
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data.map(photo => ({
      id: photo.id,
      url: `https://picsum.photos/id/${photo.id}/800/450`, // Завантажуємо зображення 800x450
      thumbnail: `https://picsum.photos/id/${photo.id}/100/75`, // Мініатюра 100x75 для іконки
    }));
  };

  // Логіка для завантаження нових сторінок фото
  useEffect(() => {
    const loadPhotos = async () => {
      const newPhotos = await fetchPhotos(currentPage);
      if (newPhotos && newPhotos.length > 0) {
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]); // Додаємо нові фото до існуючого списку
      }
    };
    loadPhotos();
  }, [currentPage]);

  // Автоматичне підвантаження нової сторінки при досягненні кінця
  useEffect(() => {
    if (currentPhoto === photos.length - 1 && photos.length > 0) {
      setCurrentPage(prevPage => prevPage + 1); // Завантаження нової сторінки автоматично
    }
  }, [currentPhoto, photos.length]);

  // Логіка автоматичної зміни фото в каруселі
  useEffect(() => {
    let interval;
    if (isCarouselActive && photos.length > 0) {
      // Перевірка чи фото підвантажено
      interval = setInterval(() => {
        // Якщо фото підвантажене, змінюємо його
        if (photos[currentPhoto]) {
          setCurrentPhoto((prevPhoto) => (prevPhoto + 1) % photos.length);
        }
      }, 3000); // міняємо фото кожні 3 секунди
    }

    return () => clearInterval(interval);
  }, [isCarouselActive, photos, currentPhoto]);

  // Логіка обмеження видимих мініатюр
  useEffect(() => {
    const start = Math.max(currentPhoto - 2, 0);
    const end = Math.min(start + 5, photos.length);
    setVisiblePhotos(photos.slice(start, end)); // Відображаємо не більше 5 мініатюр
  }, [currentPhoto, photos]);

  // Зупинка або запуск каруселі при кліку на фото
  const handlePhotoClick = () => {
    const newIconType = isCarouselActive ? 'play' : 'pause'; // Змінюємо тип іконки на основі стану каруселі
    setIconType(newIconType); // Встановлюємо тип іконки
    setIsCarouselActive(!isCarouselActive); // Зупинка або продовження каруселі
    setShowIcon(true); // Показуємо іконку

    // Приховуємо іконку через 1 секунду
    setTimeout(() => {
      setShowIcon(false);
    }, 1000);
  };

  // Вибір фото через іконки (рух каруселі не зупиняється)
  const handleIconClick = (index) => {
    setCurrentPhoto(index); // змінюємо фото через іконку, рух каруселі не зупиняється
  };

  return (
    <div className="section-2-container">
      {/* Ліва частина з текстом */}
      <div className="text-overlay">
        <p
          className={`fly-text ${hoveredLine === 'line1' ? 'animate-left' : ''}`}
          onMouseEnter={() => handleMouseEnter('line1')}
          onMouseLeave={handleMouseLeave}
        >
          VIBRANT PRINTS
        </p>
        <p
          className={`fly-text ${hoveredLine === 'line2' ? 'animate-right' : ''}`}
          onMouseEnter={() => handleMouseEnter('line2')}
          onMouseLeave={handleMouseLeave}
        >
          PATTERNED KNITS
        </p>
        <p
          className={`fly-text ${hoveredLine === 'line3' ? 'animate-left' : ''}`}
          onMouseEnter={() => handleMouseEnter('line3')}
          onMouseLeave={handleMouseLeave}
        >
          BOLD VEGAN LEATHERS
        </p>
      </div>

      {/* Права частина з каруселлю фото */}
      <div className="carousel-wrapper">
        <div className="photo-container-2" ref={photoContainerRef} onClick={handlePhotoClick}>
          {/* Виводимо фото, якщо є фото у масиві */}
          {photos.length > 0 && (
            <img src={photos[currentPhoto].url} alt={`Photo ${currentPhoto}`} className="carousel-photo" />
          )}

          {/* Іконка паузи або плей поверх фото з анімацією зникнення */}
          {showIcon && (
            <span className={`overlay-icon ${iconType === 'play' ? 'play-icon' : 'pause-icon'}`}>
              {iconType === 'play' ? '⏸️' : '▶️'}
            </span>
          )}
        </div>

        {/* Іконки під фото */}
        <div className="carousel-icons" ref={iconsContainerRef}>
          {visiblePhotos.map((photo, index) => (
            <div
              key={index}
              className={`carousel-icon ${photos.indexOf(photo) === currentPhoto ? 'active' : ''}`}
              onClick={() => handleIconClick(photos.indexOf(photo))}
            >
              <img src={photo.thumbnail} alt={`Thumbnail ${index}`} className="carousel-thumbnail" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section2;
