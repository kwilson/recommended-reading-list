import { parseString, parseNumber, parseIsbn } from './data-parser';

describe(`${parseString.name}`, () => {
  const nullValues = [null, undefined, ''];

  nullValues.forEach((inputValue) => {
    it(`returns null when the input is ${JSON.stringify(inputValue)}`, () => {
      const value = parseString(inputValue);
      expect(value).toBe(null);
    });
  });

  it('returns the input value when it is defined', () => {
    const input = 'this has a value';

    const value = parseString(input);
    expect(value).toBe(input);
  });
});

describe(`${parseNumber.name}`, () => {
  const nullValues = [null, undefined];

  nullValues.forEach((inputValue) => {
    it(`returns null when the input is ${JSON.stringify(inputValue)}`, () => {
      const value = parseNumber(inputValue);
      expect(value).toBe(null);
    });
  });

  const validValues = [-1, 0, 1, 2];

  validValues.forEach((inputValue) => {
    it(`returns the value when the input is ${JSON.stringify(
      inputValue
    )}`, () => {
      const value = parseNumber(inputValue);
      expect(value).toBe(inputValue);
    });
  });
});

describe(`${parseIsbn.name}`, () => {
  const nullValues = [null, undefined, '', 'unknown'];

  nullValues.forEach((inputValue) => {
    it(`returns null when the input is ${JSON.stringify(inputValue)}`, () => {
      const value = parseIsbn(inputValue);
      expect(value).toBe(null);
    });
  });

  it('returns the input value when it is defined', () => {
    const isbn = '9781449325862';

    const value = parseIsbn(isbn);
    expect(value).toBe(isbn);
  });
});
