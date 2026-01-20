import React, { useState } from 'react';
import '../styles/Carusel.css';

const Carousel = () => {
    const images = [
        "https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/681c719667d572276a1507aea71de9ca.jpg?itok=BXa7wk3U",
        
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div className="carousel">
            <div className="carousel-images">
                <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
            </div>
            <div className="carousel-controls">
                <button className="carousel-control prev" onClick={prevImage}>
                    &#10094;
                </button>
                <button className="carousel-control next" onClick={nextImage}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
