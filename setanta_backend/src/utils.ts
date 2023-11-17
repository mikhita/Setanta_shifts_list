const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseDbPassword = (password: unknown): string => {
  if (!isString(password)) {
    throw new Error('Incorrect or missing database password');
  }

  return password;
};
