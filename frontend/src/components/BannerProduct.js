import React, { useState, useEffect } from "react";
import image1 from "../assets/banner/img1.jpg";
import image2 from "../assets/banner/img2.jpg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const BannerProduct = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [image1, image2];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[350px] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0 flex transition-transform">
        {slides.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

     
      {/* Navigation Buttons */}
      <button
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-4 rounded-full shadow-md hover:bg-black/60 transition"
        onClick={prevSlide}
      >
        <FaAngleLeft size={24} />
      </button>
      <button
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-4 rounded-full shadow-md hover:bg-black/60 transition"
        onClick={nextSlide}
      >
        <FaAngleRight size={24} />
      </button>
    </div>
  );
};

export default BannerProduct;
