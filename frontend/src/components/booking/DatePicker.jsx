import React from 'react';
import { validateDates } from '../../utils/validation';

const DatePicker = ({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange,
  error
}) => {
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    onStartDateChange(newStartDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    onEndDateChange(newEndDate);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          min={new Date().toISOString().split('T')[0]}
          className={`
            mt-1 block w-full rounded-md shadow-sm
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}
          `}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate || new Date().toISOString().split('T')[0]}
          className={`
            mt-1 block w-full rounded-md shadow-sm
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-green-500 focus:ring-green-500'}
          `}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default DatePicker; 