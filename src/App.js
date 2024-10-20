import React, { useState } from 'react'; 
import './App.css';
import MenuBar from './menuBar/menuBar';
import Section1 from './section/section1/section1'; 
import Section2 from './section/section2/section2'; 
import Text from './section/section1/text/text';
import SectionEnd from './section/sectionEnd/sectionEnd';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Додано Routes замість Switch
import Portfolio from './menuBar/portfolio/portfolio'; // Імпорт компонента портфоліо
import Contact from './menuBar/contact/contact'; 

function App() {
  const [hoveredBox, setHoveredBox] = useState(null);

  return (
    <Router>
      <div className="App">
        <MenuBar /> {/* Меню доступне на всіх сторінках */}
        
        <Routes> {/* Використовуємо Routes замість Switch */}
          {/* Головна сторінка */}
          <Route 
            path="/" 
            element={
              <>
                {/* Секція 1 */}
                <Section1 
                  hoveredBox={hoveredBox} 
                  setHoveredBox={setHoveredBox} 
                />
                <Text />
                {/* Секція 2 */}
                <Section2 />

                {/* Секція 3 */}
                <div className="section section-3">
                  {/* Вміст */}
                </div>

                {/* Секція 4 */}
                <div className="section section-4">
                  {/* Вміст */}
                </div>
                <SectionEnd/>
              </>
            } 
          />

          {/* Сторінка портфоліо */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} /> {/* Додаємо маршрут для Contact */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
