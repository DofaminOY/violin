import React, { useEffect, useState } from 'react';
import './text.css';
import { Link } from 'react-router-dom'; // Додаємо для маршрутизації

function Text() {
  const [isFixed, setIsFixed] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Для плавної появи

  useEffect(() => {
    const handleScroll = () => {
      const textContainer = document.querySelector('.text-container');
      const rect = textContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Якщо текст доходить до 10% від низу екрану
      if (rect.top <= windowHeight * 0.9) {
        setIsVisible(true);  // Показуємо текст
        setIsFixed(true);     // Фіксуємо текст на 5% після досягнення 10%
      } else {
        setIsVisible(false); // Забираємо ефект підйому
        setIsFixed(false);   // Повертаємо текст в початкове положення
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`text-container ${isVisible ? 'visible' : ''} ${isFixed ? 'fixed' : ''}`}>
      <p>
        My name is Veronika, and I am a professional violinist with more than 15 years of experience. I currently reside in Bremen, but my musical heart is always with my audience, no matter where they are. Music is not just my profession; it is my inspiration and a way to express my inner world through the sound of the violin.
      </p>
      <p>
        For over 10 years, I performed with the philharmonic orchestra, where I played more than 500 concerts. Additionally, I have performed at over 200 events, including weddings, corporate functions, proposals, and in fine dining restaurants. My music is a blend of classical and contemporary styles: for myself, I always choose classical pieces, but at events and corporate parties, I skillfully improvise and adapt popular vocal compositions for the violin.
      </p>
      <p>
        Every performance I give is an attempt to show the beauty of each note, to touch the souls of my listeners, and to bring them positive emotions and unforgettable memories. My main goal is to create an atmosphere that will stay in your heart for a long time.
      </p>
      <p>
        Booking my performance is simple—just send a message through the contact form on my website, and I will get in touch with you. I carefully consider all of your preferences, selecting music that perfectly suits your event. I can even create a surprise in unique locations—for example, by appearing suddenly with music during a proposal.
      </p>
      <p>
        I invite you into the world of music, where every note is filled with emotion and inspiration!
      </p>

      {/* Додаємо кнопку Contact нижче тексту */}
      <div className="contact-button-container">
        <Link to="/contact" className="contact-button">Contact</Link>
      </div>
    </div>
  );
}

export default Text;
