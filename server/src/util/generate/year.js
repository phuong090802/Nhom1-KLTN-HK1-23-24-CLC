export function generateYearRangesUntilCurrent(currentDate, latestTime) {
  const yearRanges = [];
  const currentYear = currentDate.getFullYear();
  for (let i = latestTime; i > 0; i--) {
    const year = currentYear - i;
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31, 23, 59, 59, 999);
    yearRanges.push({ start, end });
  }
  yearRanges.push({
    start: new Date(currentYear, 0, 1),
    end: currentDate,
  });
  return yearRanges;
}
