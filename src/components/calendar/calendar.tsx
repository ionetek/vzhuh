import cn from 'clsx';
import { FC, RefObject, useEffect, useRef } from 'react';

import { SCROLL_TOP_OFFSET } from '@/components/calendar/constants';
import {
  dateToString,
  getCalendar,
  getNewDates,
  isDateInRange,
  isDisabledDate,
  isFirstSelectedDate,
  isSecondSelectedDate,
} from '@/components/calendar/helpers/helpers';
import { createArray } from '@/helpers/create-array/create-array';

type Props = {
  isScrollToActualDate?: boolean;
  scrolledElementRef: RefObject<HTMLDivElement>;
  dates?: [string?, string?];
  onDateChange: (dates: [string?, string?]) => void;
};

export const Calendar: FC<Props> = ({ isScrollToActualDate, scrolledElementRef, dates, onDateChange }) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const firstSelectedRef = useRef<HTMLDivElement>(null);
  const secondSelectedRef = useRef<HTMLDivElement>(null);

  const addDate = (year: number, month: number, day: number) => {
    const newDate = dateToString(year, month, day);

    const newDates = getNewDates(newDate, dates as [string?, string?]);

    onDateChange(newDates);
  };

  const calendarObj = getCalendar(12);

  useEffect(() => {
    if (!calendarRef.current || !scrolledElementRef.current || !isScrollToActualDate) return;

    const calendarY = calendarRef.current.getBoundingClientRect().y;

    //Scroll to actual date
    if (secondSelectedRef.current) {
      const secondY = secondSelectedRef.current.getBoundingClientRect().y;
      const scrollY = secondY - calendarY - SCROLL_TOP_OFFSET;
      scrolledElementRef.current.scrollTop = scrollY;
      return;
    }

    if (firstSelectedRef.current) {
      const firstY = firstSelectedRef.current.getBoundingClientRect().y;
      const scrollY = firstY - calendarY - SCROLL_TOP_OFFSET;
      scrolledElementRef.current.scrollTop = scrollY;
      return;
    }

    if (todayRef.current) {
      const todayY = todayRef.current.getBoundingClientRect().y;
      const scrollY = todayY - calendarY - SCROLL_TOP_OFFSET;
      scrolledElementRef.current.scrollTop = scrollY;
      return;
    }
  }, [isScrollToActualDate]);

  return (
    <div className='mx-auto flex max-w-[500px] flex-col gap-8' ref={calendarRef}>
      {calendarObj.map(({ monthTitle, monthNumber, days, offset, year }) => {
        return (
          <div key={monthTitle} className='flex flex-col gap-4'>
            <span className='font-bold'>
              {monthTitle} {year}
            </span>

            <div className='grid grid-cols-7 gap-y-2 [&>div:nth-child(7n)]:rounded-r-xl [&>div:nth-child(7n+1)]:rounded-l-xl'>
              {createArray(offset).map((i) => (
                <div key={i}></div>
              ))}
              {days.map(({ dayOfMonth, today, weekend }, index) => {
                const isDisabled = isDisabledDate(year, monthNumber, dayOfMonth);
                const isFirstSelected = isFirstSelectedDate(year, monthNumber, dayOfMonth, dates as [string?, string?]);
                const isSecondSelected = isSecondSelectedDate(
                  year,
                  monthNumber,
                  dayOfMonth,
                  dates as [string?, string?]
                );

                const isSelected = isFirstSelected || isSecondSelected;
                const isInRange = isDateInRange(year, monthNumber, dayOfMonth, dates as [string?, string?]);
                const isFirstDay = index === 0;
                const isLastDay = days.length === index + 1;
                return (
                  <div
                    key={dayOfMonth}
                    className={cn('relative cursor-pointer ', {
                      'font-bold text-primary': today,
                      'text-slate-400': weekend,
                      '!cursor-not-allowed text-slate-400': isDisabled,
                      'bg-slate-100': isInRange,
                      'rounded-l-xl': isFirstDay || isFirstSelected,
                      'rounded-r-xl': isLastDay || isSecondSelected,
                    })}
                    onClick={() => {
                      !isDisabled && addDate(year, monthNumber, dayOfMonth);
                    }}
                  >
                    {today && <div ref={todayRef}></div>}
                    {isFirstSelected && <div ref={firstSelectedRef}></div>}
                    {isSecondSelected && <div ref={secondSelectedRef}></div>}
                    <div
                      className={cn('flex h-10 items-center justify-center', {
                        'rounded-xl bg-primary text-white': isSelected,
                      })}
                    >
                      {dayOfMonth}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
