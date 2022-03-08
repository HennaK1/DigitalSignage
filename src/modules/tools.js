/**
 * Today's date only in ISO format
 */
const todayISODate = new Date().toISOString().split('T')[0];

/**
 * Function to get weekday's index
 *
 * @returns weekday's index
 */
const getTodayIndex = () => {
  let weekDayIndex = new Date().getDay();
  if (weekDayIndex === 0) {
    weekDayIndex = 7;
  } else {
    weekDayIndex -= 1;
  }
  return weekDayIndex;
};

export { getTodayIndex, todayISODate };
