// src/components/issues/PhotoPreview.jsx
import React, { useState } from 'react';
import { FaTimes, FaExpand, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PhotoPreview = ({ photos = [], onDelete }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">No photos uploaded</p>
      </div>
    );
  }

  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const downloadPhoto = (photoUrl, fileName) => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = fileName || `photo_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos</h3>
        <p className="text-sm text-gray-500">
          {photos.length} photo{photos.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative group">
            <div 
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo}
                alt={`Issue photo ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-1">
                <button
                  onClick={() => openLightbox(index)}
                  className="bg-black bg-opacity-50 text-white p-1.5 rounded hover:bg-opacity-70"
                  title="Expand"
                >
                  <FaExpand size={12} />
                </button>
                {onDelete && (
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700"
                    title="Delete"
                  >
                    <FaTimes size={12} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="mt-1 text-xs text-gray-500 truncate">
              Photo {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-4xl max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10"
            >
              <FaTimes size={24} />
            </button>

            {/* Download button */}
            <button
              onClick={() => downloadPhoto(photos[currentPhotoIndex], `issue_photo_${currentPhotoIndex + 1}.jpg`)}
              className="absolute top-4 right-16 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10"
              title="Download"
            >
              <FaDownload size={20} />
            </button>

            {/* Navigation buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
                >
                  <FaChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
                >
                  <FaChevronRight size={24} />
                </button>
              </>
            )}

            {/* Main image */}
            <div className="p-4">
              <img
                src={photos[currentPhotoIndex]}
                alt={`Issue photo ${currentPhotoIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-gray-500'
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoPreview;