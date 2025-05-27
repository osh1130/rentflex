// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!re.test(email)) return 'Invalid email format';
  return '';
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

// Name validation
export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return '';
};

// Date validation
export const validateDates = (startDate, endDate) => {
  if (!startDate || !endDate) return 'Both dates are required';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) return 'Start date cannot be in the past';
  if (end < start) return 'End date must be after start date';
  
  return '';
};

// Price validation
export const validatePrice = (price) => {
  if (!price) return 'Price is required';
  if (isNaN(price) || price <= 0) return 'Price must be a positive number';
  return '';
}; 