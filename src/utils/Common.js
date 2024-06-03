export const formatLabel = (key) => {
    // Convert camelCase or snake_case to Title Case
    return key
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase());
};

export const formatValue = (value) => {
    // Handle null and undefined values
    if (value === null) return 'N/A';
    if (value === 'undefined') return 'Undefined';

    // Handle date formatting if necessary
    if (isNumeric(value) && value.includes('.')) {
      const date = new Date((parseFloat(value) - 25569) * 86400 * 1000);
      return date.toLocaleDateString();
    }

    return value;
};

export  const isNumeric = (value) => {
    return !isNaN(value - parseFloat(value));
};