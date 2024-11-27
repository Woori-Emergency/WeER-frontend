export const formatValue = (current, total) => {
  if (
    (current === 0 && total === 0) || 
    (current === null || total === null) ||
    (current === undefined || total === undefined) ){
    return 'None';
  }
  return `${current}/${total}`;
};