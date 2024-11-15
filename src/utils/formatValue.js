export const formatValue = (current, total) => {
  if (
    (current === 0 && total === 0) || 
    (current === null || total === null) ||
    (current === undefined || total === undefined) || 
    current <= 0 || total === 0
  ) {
    return 'None';
  }
  return `${current}/${total}`;
};