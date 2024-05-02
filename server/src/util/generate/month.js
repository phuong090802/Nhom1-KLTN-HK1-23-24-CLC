export function generateMonthRangesUntilCurrent(currentDate, latestTime) {
  const monthRanges = [];
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  monthRanges.push({
    start: new Date(currentYear, currentMonth, 1),
    end: currentDate,
  });
  for (let i = 0; i < latestTime; i++) {
    let startMonth = currentMonth - i;
    let startYear = currentYear;
    if (startMonth <= 0) {
      startMonth += 12;
      startYear -= 1;
    }
    const start = new Date(startYear, startMonth - 1, 1);
    const day = dayOfMonth(startMonth, startYear);
    const end = new Date(startYear, startMonth - 1, day, 23, 59, 59, 999);
    monthRanges.push({ start, end });
  }
  return monthRanges.reverse();
}

function dayOfMonth(month, year) {
  switch (month) {
    case 2:
      return isLeapYear(year) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
