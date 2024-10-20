import React, { useState, useEffect, useRef } from 'react';
import './portfolio.css';

function Portfolio() {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const thumbnailsRef = useRef(null); // Реф для контейнера мініатюр

  // Функція для завантаження фото
  const fetchPhotos = async (page, limit = 30) => {
    setLoading(true);
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
    const data = await response.json();
    const newPhotos = data.map(photo => ({
      id: photo.id,
      url: `https://picsum.photos/id/${photo.id}/800/450`,
      thumbnail: `https://picsum.photos/id/${photo.id}/100/75`,
    }));

    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    setLoading(false);
  };

  // Завантаження фото при завантаженні сторінки
  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);

  // Логіка для вибору фото при кліку
  const handlePhotoClick = (index) => {
    setCurrentPhoto(index);
  };

  // Логіка для автоматичного підвантаження фото при досягненні кінця
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        setCurrentPage((prevPage) => prevPage + 1); // Переходимо до наступної сторінки
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="portfolio-container">
      {/* Головне фото */}
      <div className="main-photo-wrapper">
        <div className="main-photo-background">
          {photos.length > 0 && (
            <img
              src={photos[currentPhoto].url}
              alt={`Photo ${currentPhoto}`}
              className="main-photo"
            />
          )}
        </div>
      </div>

      {/* Мініатюри під головним фото */}
      <div className="photo-thumbnails" ref={thumbnailsRef}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`thumbnail-item ${index === currentPhoto ? 'active' : ''}`}
            onClick={() => handlePhotoClick(index)}
          >
            <img src={photo.thumbnail} alt={`Thumbnail ${index}`} className="photo-thumbnail" />
          </div>
        ))}
      </div>

      {/* Індикація завантаження нових фото */}
      {loading && <p>Завантаження нових фото...</p>}
    </div>
  );
}

export default Portfolio;
