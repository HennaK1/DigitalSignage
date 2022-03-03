/**
 * Today's date only in ISO format
 */
const todayISODate = new Date().toISOString().split('T')[0];

/**
 * TODO: add description
 *
 * @returns
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
