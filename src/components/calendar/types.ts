export type CalendarDay = {
  dayOfMonth: number;
  dayOfWeek: number;
  today: boolean;
  weekend: boolean;
};

export type CalendarMonth = {
  monthTitle: string;
  monthNumber: number;
  year: number;
  days: CalendarDay[];
  offset: number;
};
