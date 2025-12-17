import React, { useState, useEffect } from 'react';

const EquipmentForm = ({ equipment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Machine',
    status: 'Active',
    lastCleanedDate: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name || '',
        type: equipment.type || 'Machine',
        status: equipment.status || 'Active',
        lastCleanedDate: equipment.lastCleanedDate || ''
      });
    } else {
      setFormData({
        name: '',
        type: 'Machine',
        status: 'Active',
        lastCleanedDate: ''
      });
    }
    setErrors({});
  }, [equipment]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.lastCleanedDate) {
      newErrors.lastCleanedDate = 'Last cleaned date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      if (!equipment) {
        setFormData({
          name: '',
          type: 'Machine',
          status: 'Active',
          lastCleanedDate: ''
        });
      }
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{equipment ? 'Edit Equipment' : 'Add New Equipment'}</h2>
      <form onSubmit={handleSubmit} className="equipment-form">
        <div className="form-group">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
            placeholder="Enter equipment name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Machine">Machine</option>
            <option value="Vessel">Vessel</option>
            <option value="Tank">Tank</option>
            <option value="Mixer">Mixer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lastCleanedDate">
            Last Cleaned Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="lastCleanedDate"
            name="lastCleanedDate"
            value={formData.lastCleanedDate}
            onChange={handleChange}
            className={errors.lastCleanedDate ? 'input-error' : ''}
          />
          {errors.lastCleanedDate && (
            <span className="error-message">{errors.lastCleanedDate}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (equipment ? 'Update' : 'Add Equipment')}
          </button>
          {equipment && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;

