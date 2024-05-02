import { generateMonthRangesUntilCurrent } from './month.js';
import { generateYearRangesUntilCurrent } from './year.js';

export function convertTimeAndGenerateRangesForStatistic(timeUnit, start) {
  const currentDate = new Date();
  switch (timeUnit) {
    case 'month':
      return generateMonthRangesUntilCurrent(currentDate, start);
    default:
      return generateYearRangesUntilCurrent(currentDate, start);
  }
}
