import React from "react";
import "./StepIndicator.scss";

type Props = {
 totalSteps: number;
 currentStep: number;
};

const StepIndicator: React.FC<Props> = ({ totalSteps, currentStep }) => {
 const renderSteps = () => {
  const steps = [];
  for (let i = 0; i <= totalSteps; i++) {
   const isActiveStep = i === currentStep;
   const isPassedStep = i < currentStep;

   const stepClasses = `step ${isActiveStep ? 'active' : ''} ${isPassedStep ? 'passed' : ''}`;

   steps.push(
    <div key={i} className={stepClasses}>
     <p className={isPassedStep ? "active-step-number" : "step-number"}>{i + 1}</p>
    </div>
   );
  }
  return steps;
 };

 return <div className="step-indicator">
  <div className="step-container">
   {renderSteps()}
  </div>
 </div>;
};

export default StepIndicator;