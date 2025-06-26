
import React, { useState } from 'react';
import ProblemScreen from './ProblemScreen';
import SolutionScreen from './SolutionScreen';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState<'problem' | 'solution'>('problem');

  const handleNext = () => {
    setCurrentScreen('solution');
  };

  const handleEnterApp = () => {
    onComplete();
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
      {currentScreen === 'problem' && (
        <ProblemScreen onNext={handleNext} />
      )}
      {currentScreen === 'solution' && (
        <SolutionScreen onEnterApp={handleEnterApp} />
      )}
    </div>
  );
};

export default OnboardingFlow;
