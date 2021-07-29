interface StorageData {
  [key: string]: any;
}

const PREFIX = '@txt2msg';

const stringifyIfNotString = (value: any) => {
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
};

const parseData = () => {
  return Object.entries(localStorage).reduce((acc, [key, value]) => {
    const [, property] = key.split(':');
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch (e) {
      newValue = value;
    }
    return { ...acc, [property]: newValue };
  }, {});
};

export const create = (values: StorageData): void => {
  if (typeof window === 'undefined') {
    return;
  }
  Object.entries(values).forEach(([suffix, value]) => {
    const propertyName = `${PREFIX}:${suffix}`;
    localStorage[propertyName] = stringifyIfNotString(value);
  });
};

export const clear = (key?: string): void => {
  if (key) {
    localStorage.removeItem(`${PREFIX}:${key}`);
    return;
  }

  Object.entries(localStorage)
    .filter(([storageKey]) => storageKey.includes(PREFIX))
    .forEach(([storageKey]) => {
      localStorage.removeItem(`${PREFIX}:${storageKey}`);
    });
};

export const get = (key?: string): string | any => {
  if (key) {
    if (typeof window === 'undefined') {
      return;
    }

    const value = localStorage[`${PREFIX}:${key}`];
    let newValue;
    try {
      newValue = JSON.parse(value);
    } catch (e) {
      newValue = value;
    }
    return newValue;
  }

  return parseData();
};
