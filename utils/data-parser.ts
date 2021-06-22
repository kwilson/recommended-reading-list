export const parseString = (value?: string | null): string | null => {
  return value || null;
};

export const parseNumber = (value?: number | null): number | null => {
  if (value === undefined || value === null) {
    return null;
  }

  return value;
};

export const parseIsbn = (value?: string | null): string | null => {
  if (value && value !== 'unknown') {
    return value;
  }

  return null;
};
