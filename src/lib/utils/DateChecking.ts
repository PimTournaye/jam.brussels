// Check if given date matches today's date
export const checkIfDateIsToday = (date: Date) => {
  if (!date) return false;
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

// Check if given data is within the next two weeks
export const checkIfDateIsUpcoming = (date: Date) => {
  const today = new Date();
  const twoWeeks = new Date();
  twoWeeks.setDate(today.getDate() + 14);
  return date >= today && date <= twoWeeks;
};