// src/components/forms/IssueForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import PhotoUploader from './PhotoUploader';
import Button from '../common/Button';
import { FaExclamationTriangle } from 'react-icons/fa';

const IssueForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    isEmergency: false
  });
  
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});

  const categories = [
    'Plumbing',
    'Electrical',
    'HVAC',
    'Appliances',
    'Security',
    'Structural',
    'Pest Control',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Issue title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Detailed description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch({
      type: 'ADD_ISSUE',
      payload: {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.isEmergency ? 'HIGH' : 'MEDIUM',
        photos: photos.map(photo => URL.createObjectURL(photo))
      }
    });

    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Report Maintenance Issue
        </h2>
        
        <p className="text-gray-600 mb-8">
          Provide details about the problem and we'll notify your landlord.
        </p>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Issue Title"
            name="title"
            placeholder="e.g., Leaking kitchen faucet"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <TextArea
            label="Detailed Description"
            name="description"
            placeholder="Describe the issue in detail. When did it start? Is it an emergency?"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            error={errors.description}
          />

          <PhotoUploader photos={photos} onPhotosChange={setPhotos} />

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isEmergency"
                checked={formData.isEmergency}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                This is an emergency requiring immediate attention
              </span>
            </label>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" fullWidth>
              Submit Report
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </div>
        </form>

        {formData.isEmergency && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <FaExclamationTriangle className="text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-red-800">
                  Urgent repair?
                </h4>
                <p className="mt-1 text-sm text-red-700">
                  Contact our 24/7 emergency hotline at{' '}
                  <a href="tel:5550123456" className="font-semibold underline">
                    (555) 012-3456
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueForm;