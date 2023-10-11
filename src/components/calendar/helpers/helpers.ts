import { CalendarDay, CalendarMonth } from '@/components/calendar/types';
import { createArray } from '@/helpers/create-array/create-array';

const daysInMonth = (year: number, month: number): number => {
  return 32 - new Date(year, month, 32).getDate();
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};

const isWeekend = (day: number) => {
  return day === 6 || day === 7;
};

const getDay = (year: number, month: number, day: number): CalendarDay => {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
  const today = isToday(date);
  const weekend = isWeekend(dayOfWeek);
  return {
    dayOfMonth: day,
    dayOfWeek,
    today,
    weekend,
  };
};

const getOffset = (days: CalendarDay[]) => {
  const firstDay = days[0];
  return firstDay.dayOfWeek - 1;
};

export const getCalendar = (month: number) => {
  return createArray(month).reduceRight((acc, index) => {
    const currentDate = new Date();

    currentDate.setMonth(currentDate.getMonth() - index);

    const monthTitle = capitalizeFirstLetter(currentDate.toLocaleString('ru-RU', { month: 'long' }));
    const monthNumber = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysAmount = daysInMonth(year, monthNumber);

    const days = createArray(daysAmount).reduce((acc, index) => {
      const dayObj = getDay(year, monthNumber, index + 1);
      acc.push(dayObj);
      return acc;
    }, [] as CalendarDay[]);

    const offset = getOffset(days);

    acc.push({ monthTitle, monthNumber, year, days, offset });

    return acc;
  }, [] as CalendarMonth[]);
};

export const withZero = (value: number) => {
  return ('0' + value).slice(-2);
};

export const getNewDates = (newDate: string, selectedDates: [string?, string?]): [string?, string?] => {
  const newDateTimestamp = new Date(newDate).getTime();
  const firstDate = selectedDates[0];
  const secondDate = selectedDates[1];
  //Если даты пусты
  if (!selectedDates.length) {
    return [newDate];
  }

  //Если есть одна дата
  if (firstDate && !secondDate) {
    const firstDateTimestamp = new Date(firstDate).getTime();

    if (firstDateTimestamp > newDateTimestamp) {
      return [newDate, firstDate]; //Если текущая дата позже новой
    } else if (firstDateTimestamp < newDateTimestamp) {
      return [firstDate, newDate]; //Если текущая дата раньше новой
    } else {
      return [firstDate]; //Если текущая дата равна новой
    }
  }
  //Если есть 2 даты
  return [newDate];
};

export const dateToString = (year: number, month: number, day: number) => {
  return `${year}-${withZero(month + 1)}-${withZero(day)}`;
};

export const isSelectedDate = (year: number, month: number, day: number, selectedDates: [string?, string?]) => {
  const currentDateTimestamp = new Date(dateToString(year, month, day)).getTime();
  const firstDate = selectedDates[0];
  const secondDate = selectedDates[1];

  if (firstDate && currentDateTimestamp === new Date(firstDate).getTime()) {
    return true;
  }

  if (secondDate && currentDateTimestamp === new Date(secondDate).getTime()) {
    return true;
  }

  return false;
};

export const isFirstSelectedDate = (year: number, month: number, day: number, selectedDates: [string?, string?]) => {
  const currentDateTimestamp = new Date(dateToString(year, month, day)).getTime();
  const firstDate = selectedDates[0];
  if (firstDate && currentDateTimestamp === new Date(firstDate).getTime()) {
    return true;
  }
  return false;
};

export const isSecondSelectedDate = (year: number, month: number, day: number, selectedDates: [string?, string?]) => {
  const currentDateTimestamp = new Date(dateToString(year, month, day)).getTime();
  const secondDate = selectedDates[1];
  if (secondDate && currentDateTimestamp === new Date(secondDate).getTime()) {
    return true;
  }
  return false;
};

export const isDisabledDate = (year: number, month: number, day: number) => {
  const today = new Date();
  const todayTimestamp = new Date(dateToString(today.getFullYear(), today.getMonth(), today.getDate())).getTime();
  const currentDateTimestamp = new Date(dateToString(year, month, day)).getTime();

  return currentDateTimestamp > todayTimestamp;
};

export const isDateInRange = (year: number, month: number, day: number, selectedDates: [string?, string?]) => {
  const currentDateTimestamp = new Date(dateToString(year, month, day)).getTime();
  const firstDate = selectedDates[0];
  const secondDate = selectedDates[1];

  if (firstDate && secondDate) {
    const firstDateTimestamp = new Date(firstDate).getTime();
    const secondDateTimestamp = new Date(secondDate).getTime();

    return currentDateTimestamp >= firstDateTimestamp && currentDateTimestamp <= secondDateTimestamp;
  }

  return false;
};
