// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  return date instanceof Date
    ? date.toISOString().split('T')[0]
    : date;
};

// Calculate number of days between two dates
export const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Check if a date is in the past
export const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
};

// Get formatted date range string
export const getDateRangeString = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
};

// Add days to a date
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return formatDate(result);
}; 