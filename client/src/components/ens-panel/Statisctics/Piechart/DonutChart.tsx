import React from 'react';

interface Segment {
  value: number;
  color: string;
  strokeColor: string;
}

interface DonutChartProps {
  segments: Segment[];
  total: number;
  size?: number;
  strokeWidth?: number;
  centerValue: string;
  centerLabel: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  segments,
  total,
  size = 192,
  strokeWidth = 16,
  centerValue,
  centerLabel
}) => {
  const radius = (size / 2) - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedOffset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Fond du cercle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {segments.map((segment, index) => {
          const dashLength = (segment.value / total) * circumference;
          const dashArray = `${dashLength} ${circumference}`;
          const dashOffset = -accumulatedOffset;
          
          accumulatedOffset += dashLength;
          
          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={segment.strokeColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-3xl font-bold text-gray-900">{centerValue}</span>
        <span className="text-sm text-gray-500">{centerLabel}</span>
      </div>
    </div>
  );
};

export default DonutChart;