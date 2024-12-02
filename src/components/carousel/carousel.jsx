import React, { useState, useEffect } from 'react';

import searchIcon from './icon/searchIcon.svg';
import timeIcon from './icon/timeIcon.svg';
import shildIcon from './icon/shildIcon.svg';

const data = [
  { id: 1, icon: timeIcon, text: 'Высокая и оперативная скорость обработки заявки' },
  { id: 2, icon: searchIcon, text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос' },
  { id: 3, icon: shildIcon, text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству' },
  { id: 4, icon: searchIcon, text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос' },
  { id: 5, icon: shildIcon, text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству' },
  { id: 6, icon: timeIcon, text: 'Высокая и оперативная скорость обработки заявки' },
];
  
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(window.innerWidth < 768 ? 1 : 3);
  
  const next = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex + itemsToShow < data.length ? prevIndex + itemsToShow : prevIndex;
    });
  };
  
  const prev = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex - itemsToShow >= 0 ? prevIndex - itemsToShow : prevIndex;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 768 ? 1 : 3);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  return (
    <div className="carousel-container">
      <button onClick={prev} disabled={currentIndex === 0} className="carousel-button">&#10094;</button>
        <nav className="carousel-cards">
          {data.slice(currentIndex, currentIndex + itemsToShow).map(item => (
            <nav key={item.id} className="carousel-card">
              <nav className='carousel-icon'><img src={item.icon} alt='icon' /></nav>
              <p>{item.text}</p>
            </nav>
          ))}
        </nav>
      <button onClick={next} disabled={currentIndex + itemsToShow >= data.length} className="carousel-button">&#10095;</button>
    </div>
  );
};
  
export default Carousel;
