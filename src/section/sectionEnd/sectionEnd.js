import React from 'react';
import { Link } from 'react-router-dom';
import './sectionEnd.css';

function SectionEnd() {
  // Функція для прокрутки сторінки до верху
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sectionEnd">
      <div className="text-content">
        <p>
          Have you ever wondered why the sound of the violin captivates our hearts and souls so deeply? What is it about these melodies that makes us want to listen to them again and again, and why do other instruments sometimes fail to evoke the same enchantment? What should the music be like at important events such as weddings, celebrations, or personal moments?
        </p>
        <p>
          When it comes to professional violin performances, I, as a musician, see the main value in conveying the emotions that fill the moment through every note. It is the music that creates a special atmosphere, making each event unique. Love, tenderness, joy, admiration, wonder—all of these feelings can be experienced through the melodies of the violin. My task as a musician is to capture this wave of emotions and express them in the music so that everyone present feels part of this magical moment.
        </p>
        <p>
          You don’t have to be a connoisseur of classical music to enjoy the sound of the violin—just listen with your heart. I am sure that every performance will leave unforgettable impressions on you, and together we will create an atmosphere that will forever remain in your memories.
        </p>
      </div>

      {/* Окреме меню внизу сторінки */}
      <div className="footer-menu">
        <nav className="footer-navbar">
          <div className="footer-navbar-menu">
            <ul>
              <li><Link to="/" onClick={scrollToTop}>HOME</Link></li> {/* Клік по Home прокручує сторінку наверх */}
              <li><Link to="/portfolio">PORTFOLIO</Link></li>
              <li><Link to="/info">INFO</Link></li>
              <li><Link to="/contact">CONTACT</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SectionEnd;
