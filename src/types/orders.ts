export type FilterOrdersValues = {
  status: string;
  source: string;
  dates: [string?, string?];
};

export type FilterOrdersQuery = {
  status?: string;
  source?: string;
  dates?: string;
};

export const STATUS = {
  ALL: 'all',
};

export const SOURCE = {
  ALL: 'all',
};

export const DEFAULT_DATES = [];
