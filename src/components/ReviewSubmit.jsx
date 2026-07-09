import React, { useState } from 'react';
import { validationSchema } from '../schemas/validationSchema';

export const ReviewSubmit = ({ formData, setFormData, onBack, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));

    // Clear error when checkbox is checked
    if (checked) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const isFormValid = () => {
    try {
      validationSchema.parse(formData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = () => {
    try {
      validationSchema.parse(formData);
      onSubmit();
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      setTouched({
        agreeToTerms: true,
        subscribeNewsletter: true
      });
    }
  };

  return (
    <div>
      <div className="form-header">
        <h2>Review & Submit</h2>
        <p>Verify your information before submitting</p>
      </div>

      {/* Personal Info Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '15px', fontWeight: '600' }}>
          Personal Information
        </h3>
        <div className="review-item">
          <div className="review-item-label">First Name</div>
          <div className="review-item-value">{formData.firstName}</div>
        </div>
        <div className="review-item">
          <div className="review-item-label">Last Name</div>
          <div className="review-item-value">{formData.lastName}</div>
        </div>
        <div className="review-item">
          <div className="review-item-label">Email Address</div>
          <div className="review-item-value">{formData.email}</div>
        </div>
        <div className="review-item">
          <div className="review-item-label">Phone Number</div>
          <div className="review-item-value">{formData.phone}</div>
        </div>
      </div>

      {/* Account Details Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '15px', fontWeight: '600' }}>
          Account Details
        </h3>
        <div className="review-item">
          <div className="review-item-label">Company</div>
          <div className="review-item-value">{formData.company}</div>
        </div>
        <div className="review-item">
          <div className="review-item-label">Job Title</div>
          <div className="review-item-value">{formData.jobTitle}</div>
        </div>
        <div className="review-item">
          <div className="review-item-label">Username</div>
          <div className="review-item-value">{formData.username}</div>
        </div>
        <div className="review-item">
          <div className="review-item-label">Password</div>
          <div className="review-item-value masked">••••••••</div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div style={{ marginBottom: '20px' }}>
        <div className="checkbox-group">
          <input
            id="agreeToTerms"
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms || false}
            onChange={handleCheckboxChange}
            onBlur={() => setTouched(prev => ({ ...prev, agreeToTerms: true }))}
          />
          <label htmlFor="agreeToTerms">
            I agree to the Terms of Service and Privacy Policy *
          </label>
        </div>
        {errors.agreeToTerms && touched.agreeToTerms && (
          <div className="error-message" style={{ marginLeft: '28px' }}>
            ✗ {errors.agreeToTerms}
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div style={{ marginBottom: '30px' }}>
        <div className="checkbox-group">
          <input
            id="subscribeNewsletter"
            type="checkbox"
            name="subscribeNewsletter"
            checked={formData.subscribeNewsletter || false}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="subscribeNewsletter">
            Send me product updates and news
          </label>
        </div>
      </div>

      <div className="buttons-section">
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-submit" onClick={handleSubmit} disabled={!isFormValid()}>
          Submit →
        </button>
      </div>
    </div>
  );
};
