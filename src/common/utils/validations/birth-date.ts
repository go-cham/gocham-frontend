import { isNumber } from 'lodash';
import { calculateAge } from '@/common/utils/date/calculateAge';
import { getDaysInMonth } from '@/common/utils/date/getDaysInMonth';
import { isFuture } from '@/common/utils/date/isFuture';
import { BirthDate } from '@/features/register/components/form';

export function validateBirthDate({ year, month, day }: BirthDate) {
  const yearNum = year ? parseInt(year) : null;
  const monthNum = month ? parseInt(month) : null;
  const dayNum = day ? parseInt(day) : null;

  if (!yearNum || !monthNum || !dayNum) {
    return '본인의 생년월일을 입력해주세요.';
  }
  if (isFuture(yearNum, monthNum, dayNum)) {
    return '생년월일을 다시 확인해주세요.';
  }
  if (
    monthNum < 0 ||
    monthNum > 12 ||
    dayNum < 0 ||
    dayNum > getDaysInMonth(monthNum - 1, yearNum)
  ) {
    return '생년월일을 다시 확인해주세요.';
  }
  if (calculateAge(yearNum, monthNum, dayNum) < 14) {
    return '만 14세 이상부터 가입이 가능합니다.';
  }
  return null;
}

export function fixDate(year?: string, month?: string, day?: string) {
  const yearNum = year ? parseInt(year) : undefined;
  let monthNum = month ? parseInt(month) : undefined;
  let dayNum = day ? parseInt(day) : undefined;
  const isMonthPadded = month && month[0] === '0';
  const isDayPadded = day && day[0] === '0';
  if (isNumber(monthNum) && monthNum < 1) {
    monthNum = 1;
  }
  if (isNumber(monthNum) && monthNum > 12) {
    monthNum = 12;
  }
  if (isNumber(dayNum) && dayNum < 1) {
    dayNum = 1;
  }
  if (isNumber(yearNum) && isNumber(monthNum) && isNumber(dayNum)) {
    const daysInMonth = getDaysInMonth(monthNum - 1, yearNum);
    if (dayNum > daysInMonth) {
      dayNum = daysInMonth;
    }
  }
  return {
    year: yearNum ? String(yearNum) : '',
    month: monthNum
      ? isMonthPadded
        ? String(monthNum).padStart(2, '0')
        : String(monthNum)
      : '',
    day: dayNum
      ? isDayPadded
        ? String(dayNum).padStart(2, '0')
        : String(dayNum)
      : '',
  };
}
