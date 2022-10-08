export const matchDateToToday = (date: Date) => {
  const today = new Date().getDate()
  const dateToCheck = new Date(date).getDate()
  return today === dateToCheck
}

// Check the date of an event starting from tomorrow to the end of the two next weeks
export const checkUpcomingDate = (date: Date) => {
  const today = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(today.getDate() + 14);
  return date >= today && date <= twoWeeksFromNow;
}