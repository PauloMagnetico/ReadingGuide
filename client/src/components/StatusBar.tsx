import React from 'react';
import { FaHourglassStart, FaVideo, FaImage, FaChartLine, FaStop } from 'react-icons/fa';

interface StatusBarProps {
    currentStep: number;
}

const STATUS_STEPS = [
  { name: 'waiting to stream', icon: <FaHourglassStart /> },
  { name: 'streaming', icon: <FaVideo /> },
  { name: 'extracting text from image', icon: <FaImage /> },
  { name: 'analyzing data', icon: <FaChartLine /> },
  { name: 'stream stopped', icon: <FaStop /> },
];

const StatusBar: React.FC<StatusBarProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      {STATUS_STEPS.map((step, index) => (
        <div key={step.name} className="flex items-center">
          <div className={`p-2 rounded-full ${index <= currentStep ? 'bg-green-500' : 'bg-gray-300'}`}>
            {React.cloneElement(step.icon, { className: `text-white ${index <= currentStep ? 'text-xl' : 'text-lg'}` })}
          </div>
          {index < STATUS_STEPS.length - 1 && (
            <div className={`flex-1 mx-2 h-1 ${index < currentStep ? 'bg-green-500' : 'bg-gray-300'}`} />
          )}
          <span className={`ml-2 ${index <= currentStep ? 'font-bold' : 'text-gray-500'}`}>{step.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StatusBar;