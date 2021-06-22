import fetchMock from 'jest-fetch-mock';

import { getBooks, IBookDataResponse } from './books';
import { parseIsbn, parseNumber, parseString } from '../utils/data-parser';

jest.mock('../utils/data-parser', () => ({
  parseIsbn: jest
    .fn()
    .mockImplementation((input: string) => `parseIsbn:${input}`),
  parseNumber: jest
    .fn()
    .mockImplementation((input: string) => `parseNumber:${input}`),
  parseString: jest
    .fn()
    .mockImplementation((input: string) => `parseString:${input}`),
}));

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  jest.resetAllMocks();
  fetchMock.resetMocks();
});

describe(`${getBooks.name}`, () => {
  it('returns an empty array when the API call fails', async () => {
    const error = new Error('failed API call');
    fetchMock.mockRejectOnce(error);

    const data = await getBooks();

    expect(data).toHaveLength(0);
    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it('returns the data from the API call', async () => {
    const testData: IBookDataResponse = {
      books: [1, 2, 3, 4, 5].map((key) => ({
        id: `id-${key}`,
        cover: `url://${key}`,
        isbn: `isbn-${key}`,
        title: `title-${key}`,
        subtitle: `subtitle-${key}`,
        author: `author-${key}`,
        published: `published-${key}`,
        publisher: `publisher-${key}`,
        pages: key,
        description: `description-${key}`,
        website: `url://${key}`,
      })),
    };
    fetchMock.mockResponseOnce(JSON.stringify(testData));

    const data = await getBooks();

    expect(data).toHaveLength(testData.books.length);

    testData.books.forEach((inputBook, index) => {
      const outputValue = data[index];

      expect(outputValue).toEqual({
        id: inputBook.id,
        cover: inputBook.cover,
        isbn: parseIsbn(inputBook.isbn),
        title: inputBook.title,
        subtitle: inputBook.subtitle,
        author: inputBook.author,
        published: inputBook.published,
        publisher: parseString(inputBook.publisher),
        pages: parseNumber(inputBook.pages),
        description: parseString(inputBook.description),
        website: parseString(inputBook.website),
      });

      expect(parseString).toHaveBeenCalledWith(inputBook.description);
      expect(parseString).toHaveBeenCalledWith(inputBook.publisher);
      expect(parseString).toHaveBeenCalledWith(inputBook.website);

      expect(parseNumber).toHaveBeenCalledWith(inputBook.pages);
      expect(parseIsbn).toHaveBeenCalledWith(inputBook.isbn);
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
  });
});
