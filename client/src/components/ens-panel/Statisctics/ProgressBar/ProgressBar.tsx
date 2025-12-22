import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  label?: string;
  valueLabel?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  showLabel = true,
  label = "Taux de completion",
  valueLabel 
}) => {
  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{label}</span>
          <span className="text-xs font-semibold text-blue-600">
            {valueLabel || `${progress}%`}
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;