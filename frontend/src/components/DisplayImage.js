import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imgUrl, onClose }) => {
  // Close on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose} // Close when clicking outside
    >
      <div 
        className="relative bg-white shadow-xl rounded-lg max-w-5xl w-full mx-auto p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition duration-300"
          onClick={onClose}
        >
          <CgClose size={30} />
        </button>

        {/* Image Display */}
        <div className="flex justify-center items-center p-4 overflow-hidden max-h-[80vh] max-w-full">
          <img
            src={imgUrl}
            alt="Displayed Content"
            className="object-contain h-full w-full rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
