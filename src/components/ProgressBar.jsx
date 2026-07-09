import React from 'react';

export const ProgressBar = ({ currentStep, totalSteps, stepNames }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-section">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="progress-info">
        <span className="progress-label">{stepNames[currentStep - 1]}</span>
        <span>Step {currentStep} of {totalSteps}</span>
      </div>
    </div>
  );
};
