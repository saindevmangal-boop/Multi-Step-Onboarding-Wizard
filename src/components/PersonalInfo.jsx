import React, { useState } from 'react';
import { personalInfoSchema } from '../schemas/validationSchema';

export const PersonalInfo = ({ formData, setFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    try {
      const schema = personalInfoSchema;
      // Create partial object for validation
      const fieldToValidate = { [name]: value };
      
      // Try to validate just this field by getting the shape
      const field = schema.shape[name];
      if (field) {
        field.parse(value);
        return null;
      }
    } catch (error) {
      return error.errors[0]?.message || 'Invalid input';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const isFormValid = () => {
    try {
      personalInfoSchema.parse(formData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleNext = () => {
    try {
      personalInfoSchema.parse(formData);
      onNext();
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      // Mark all fields as touched to show errors
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true
      });
    }
  };

  return (
    <div>
      <div className="form-header">
        <h2>Personal Information</h2>
        <p>Let's start with your basic details</p>
      </div>

      <div className="form-group">
        <label htmlFor="firstName">First Name *</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.firstName && touched.firstName ? 'error' : ''}
          placeholder="John"
        />
        {errors.firstName && touched.firstName && (
          <div className="error-message">✗ {errors.firstName}</div>
        )}
        {!errors.firstName && touched.firstName && formData.firstName && (
          <div className="success-message">✓ Valid</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name *</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.lastName && touched.lastName ? 'error' : ''}
          placeholder="Doe"
        />
        {errors.lastName && touched.lastName && (
          <div className="error-message">✗ {errors.lastName}</div>
        )}
        {!errors.lastName && touched.lastName && formData.lastName && (
          <div className="success-message">✓ Valid</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? 'error' : ''}
          placeholder="john@example.com"
        />
        {errors.email && touched.email && (
          <div className="error-message">✗ {errors.email}</div>
        )}
        {!errors.email && touched.email && formData.email && (
          <div className="success-message">✓ Valid email</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.phone && touched.phone ? 'error' : ''}
          placeholder="+1 (555) 000-0000"
        />
        {errors.phone && touched.phone && (
          <div className="error-message">✗ {errors.phone}</div>
        )}
        {!errors.phone && touched.phone && formData.phone && (
          <div className="success-message">✓ Valid</div>
        )}
      </div>

      <div className="buttons-section">
        <button className="btn-primary" onClick={handleNext} disabled={!isFormValid()}>
          Next →
        </button>
      </div>
    </div>
  );
};
