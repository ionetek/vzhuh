import { DEFAULT_DATES } from '@/types/orders';

export const datesFromQuery = (query: string | null) => {
  if (!query) return DEFAULT_DATES;

  const isValid =
    /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])(,\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))?$/.test(query);

  if (isValid) {
    return query.split(',');
  }

  return DEFAULT_DATES;
};
