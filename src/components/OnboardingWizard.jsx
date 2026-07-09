import React, { useState } from 'react';
import { PersonalInfo } from './PersonalInfo';
import { AccountDetails } from './AccountDetails';
import { ReviewSubmit } from './ReviewSubmit';
import { ProgressBar } from './ProgressBar';

const STEPS = {
  PERSONAL_INFO: 1,
  ACCOUNT_DETAILS: 2,
  REVIEW_SUBMIT: 3,
  SUCCESS: 4
};

const STEP_NAMES = ['Personal Info', 'Account Details', 'Review & Submit'];

export const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.PERSONAL_INFO);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Unified form state - lifted to parent for persistence across views
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > STEPS.PERSONAL_INFO) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the complete payload
      console.log('===== ONBOARDING SUBMISSION =====');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Complete Form Payload:', formData);
      console.log('=====================================');
      
      // Move to success screen
      setCurrentStep(STEPS.SUCCESS);
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep(STEPS.PERSONAL_INFO);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      subscribeNewsletter: false,
    });
  };

  return (
    <div className="wizard-container">
      {currentStep !== STEPS.SUCCESS && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={3}
          stepNames={STEP_NAMES}
        />
      )}

      <div className="form-section">
        {currentStep === STEPS.PERSONAL_INFO && (
          <PersonalInfo
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        )}

        {currentStep === STEPS.ACCOUNT_DETAILS && (
          <AccountDetails
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}

        {currentStep === STEPS.REVIEW_SUBMIT && (
          <ReviewSubmit
            formData={formData}
            setFormData={setFormData}
            onBack={handlePreviousStep}
            onSubmit={handleSubmit}
          />
        )}

        {currentStep === STEPS.SUCCESS && (
          <div className="success-screen">
            <div className="success-icon">✓</div>
            <h2>Account Created Successfully!</h2>
            <p>
              Welcome to our platform, <strong>{formData.firstName}!</strong>
            </p>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>
              Your account has been created with the email <strong>{formData.email}</strong>
            </p>
            <p style={{ fontSize: '13px', color: '#999', marginBottom: '30px' }}>
              A confirmation email has been sent to your inbox.
            </p>
            <button className="btn-primary" onClick={handleRestart} style={{ width: '100%' }}>
              Create Another Account
            </button>
          </div>
        )}
      </div>

      {isSubmitting && currentStep === STEPS.REVIEW_SUBMIT && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div className="spinner" style={{ fontSize: '40px', marginBottom: '15px' }}>
              ⏳
            </div>
            <p style={{ color: '#333', fontWeight: '600' }}>Submitting your information...</p>
          </div>
        </div>
      )}
    </div>
  );
};
