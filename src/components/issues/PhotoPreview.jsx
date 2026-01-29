import React, { useState } from "react";
import {
  FaTimes,
  FaExpand,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const PhotoPreview = ({ photos = [], onDelete }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return null; // nothing to show
  }

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  };

  const downloadPhoto = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `issue_photo_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Thumbnail grid */}
      <div className="issue-photos">
        {photos.map((photo, index) => (
          <div key={index} className="relative group">
            <img
              src={photo}
              alt={`Issue photo ${index + 1}`}
              className="issue-photo cursor-pointer"
              onClick={() => openLightbox(index)}
            />

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => openLightbox(index)}
                className="bg-black/60 text-white p-2 rounded"
                title="View"
              >
                <FaExpand size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-black/60 p-3 rounded-full"
          >
            <FaTimes size={18} />
          </button>

          {/* Download */}
          <button
            onClick={() => downloadPhoto(photos[currentIndex])}
            className="absolute top-4 right-16 text-white bg-black/60 p-3 rounded-full"
          >
            <FaDownload size={16} />
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-4 text-white bg-black/60 p-3 rounded-full"
            >
              <FaChevronLeft size={20} />
            </button>
          )}

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={next}
              className="absolute right-4 text-white bg-black/60 p-3 rounded-full"
            >
              <FaChevronRight size={20} />
            </button>
          )}

          {/* Image */}
          <img
            src={photos[currentIndex]}
            alt="Issue preview"
            className="max-w-[90%] max-h-[80vh] object-contain rounded-lg"
          />

          {/* Counter */}
          <div className="absolute bottom-4 text-white text-sm bg-black/60 px-3 py-1 rounded-full">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoPreview;
