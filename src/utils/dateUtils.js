export const formatDate = (dateString) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return `${new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',  
      day: 'numeric', 
      hour: 'numeric',
      minute: '2-digit',
      hourCycle: 'h23', 
    }).format(date)}`;
  } catch (error) {
    if (error instanceof RangeError) {
      console.error('Invalid date format:', dateString);
      return 'N/A';
    } else {
      throw error;
    }
  }
};