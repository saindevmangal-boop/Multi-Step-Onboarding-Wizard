import React, { useState } from 'react';
import { accountDetailsSchema } from '../schemas/validationSchema';

export const AccountDetails = ({ formData, setFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (name, value) => {
    try {
      const schema = accountDetailsSchema;
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

    // Cross-field validation for password confirmation
    if (name === 'password' && formData.confirmPassword) {
      if (value !== formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: "Passwords don't match"
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: null
        }));
      }
    }

    if (name === 'confirmPassword' && formData.password) {
      if (value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: "Passwords don't match"
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirmPassword: null
        }));
      }
    }
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
      accountDetailsSchema.parse(formData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleNext = () => {
    try {
      accountDetailsSchema.parse(formData);
      onNext();
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      setTouched({
        company: true,
        jobTitle: true,
        username: true,
        password: true,
        confirmPassword: true
      });
    }
  };

  return (
    <div>
      <div className="form-header">
        <h2>Account Details</h2>
        <p>Create your account credentials</p>
      </div>

      <div className="form-group">
        <label htmlFor="company">Company Name *</label>
        <input
          id="company"
          type="text"
          name="company"
          value={formData.company || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.company && touched.company ? 'error' : ''}
          placeholder="Your Company Inc."
        />
        {errors.company && touched.company && (
          <div className="error-message">✗ {errors.company}</div>
        )}
        {!errors.company && touched.company && formData.company && (
          <div className="success-message">✓ Valid</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title *</label>
        <input
          id="jobTitle"
          type="text"
          name="jobTitle"
          value={formData.jobTitle || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.jobTitle && touched.jobTitle ? 'error' : ''}
          placeholder="Product Manager"
        />
        {errors.jobTitle && touched.jobTitle && (
          <div className="error-message">✗ {errors.jobTitle}</div>
        )}
        {!errors.jobTitle && touched.jobTitle && formData.jobTitle && (
          <div className="success-message">✓ Valid</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="username">Username *</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.username && touched.username ? 'error' : ''}
          placeholder="john_doe"
        />
        {errors.username && touched.username && (
          <div className="error-message">✗ {errors.username}</div>
        )}
        {!errors.username && touched.username && formData.username && (
          <div className="success-message">✓ Valid</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? 'error' : ''}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && touched.password && (
          <div className="error-message">✗ {errors.password}</div>
        )}
        {!errors.password && touched.password && formData.password && (
          <div className="success-message">✓ Strong password</div>
        )}
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Password requirements: 8+ chars, uppercase, lowercase, number, special char
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <div className="password-wrapper">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            title={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <div className="error-message">✗ {errors.confirmPassword}</div>
        )}
        {!errors.confirmPassword && touched.confirmPassword && formData.confirmPassword && (
          <div className="success-message">✓ Passwords match</div>
        )}
      </div>

      <div className="buttons-section">
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-primary" onClick={handleNext} disabled={!isFormValid()}>
          Next →
        </button>
      </div>
    </div>
  );
};
