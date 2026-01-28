// src/components/forms/PhotoUploader.jsx
import React, { useCallback } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const PhotoUploader = ({ photos = [], onPhotosChange }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    onPhotosChange([...photos, ...files]);
  }, [photos, onPhotosChange]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    onPhotosChange([...photos, ...files]);
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Photos
      </label>
      
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
      >
        <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload">
          <button
            type="button"
            className="btn-secondary mt-4"
          >
            Select Files
          </button>
        </label>
      </div>

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              {photo instanceof File ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <img
                  src={photo}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;