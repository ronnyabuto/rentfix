import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMaintenanceReports } from '../../hooks/useMaintenanceReports';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import PhotoUploader from './PhotoUploader';
import { FaExclamationTriangle } from 'react-icons/fa';
import { CATEGORY, PRIORITY } from '../../utils/constants';

const IssueForm = () => {
  const navigate = useNavigate();
  const { createReport } = useMaintenanceReports();

  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORY.PLUMBING,
    description: '',
    isEmergency: false
  });

  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Issue title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Detailed description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }


    const photoLinks = photos.map(p => p.name || 'photo.jpg');

    createReport({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.isEmergency ? PRIORITY.HIGH : PRIORITY.MEDIUM,
      photos: photoLinks
    });

    navigate('/tenant/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="t-form-card">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Issue Title"
          name="title"
          placeholder="e.g., Leaking kitchen faucet"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          className="t-form-input"
        />

        <div className="t-form-field">
          <label className="t-form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="t-form-input"
          >
            {Object.values(CATEGORY).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <TextArea
          label="Detailed Description"
          name="description"
          placeholder="Describe the issue in detail..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
          error={errors.description}
          className="t-form-input t-form-textarea"
        />

        <PhotoUploader photos={photos} onPhotosChange={setPhotos} />

        <div className="t-form-field" style={{ marginBottom: 20 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="isEmergency"
              checked={formData.isEmergency}
              onChange={handleChange}
            />
            <span className="t-form-label" style={{ marginBottom: 0 }}>This is an emergency</span>
          </label>
        </div>

        <div className="t-form-actions">
          <button type="submit" className="t-simple-btn">
            Submit Report
          </button>
          <button
            type="button"
            className="t-form-cancel"
            onClick={() => navigate('/tenant/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>

      {formData.isEmergency && (
        <div style={{ marginTop: 24, padding: 16, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, display: 'flex', gap: 12 }}>
          <FaExclamationTriangle style={{ color: '#dc2626', marginTop: 4 }} />
          <div>
            <div style={{ fontWeight: 800, color: '#991b1b' }}>Urgent repair?</div>
            <div style={{ fontSize: 13, color: '#b91c1c' }}>Contact emergency management at (555) 123-4567</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueForm;