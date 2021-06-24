import fetchMock from 'jest-fetch-mock';

import {
  getBooks,
  getBooksByAuthor,
  getBook,
  IBookDataResponse,
} from './books';
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

const testData: IBookDataResponse = {
  books: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => ({
    id: `id-${key}`,
    cover: `url://${key}`,
    isbn: `isbn-${key}`,
    title: `title-${key}`,
    subtitle: `subtitle-${key}`,
    author: `author-${key % 2}`,
    published: `published-${key}`,
    publisher: `publisher-${key}`,
    pages: key,
    description: `description-${key}`,
    website: `url://${key}`,
  })),
};

describe(`${getBooks.name}`, () => {
  it('returns an empty array when the API call fails', async () => {
    const error = new Error('failed API call');
    fetchMock.mockRejectOnce(error);

    const data = await getBooks();

    expect(data).toHaveLength(0);
    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it('returns the data from the API call', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData));

    const data = await getBooks();

    expect(data).toHaveLength(testData.books.length);

    testData.books.forEach((inputBook, index) => {
      const outputValue = data[index];

      expect(outputValue).toEqual({
        id: inputBook.id,
        cover: inputBook.cover,
        title: inputBook.title,
        author: inputBook.author,
      });
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
  });
});

describe(`${getBooksByAuthor.name}`, () => {
  it('returns an empty array when the API call fails', async () => {
    const error = new Error('failed API call');
    fetchMock.mockRejectOnce(error);

    const data = await getBooksByAuthor('bob');

    expect(data).toHaveLength(0);
    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it('returns the data from the API call', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData));

    const targetAuthor = testData.books[0].author;
    const matchingBooks = testData.books.filter(
      (book) => book.author === targetAuthor
    );

    const data = await getBooksByAuthor(targetAuthor);

    expect(data).toHaveLength(matchingBooks.length);

    matchingBooks.forEach((inputBook, index) => {
      const outputValue = data[index];

      expect(outputValue).toEqual({
        id: inputBook.id,
        cover: inputBook.cover,
        title: inputBook.title,
        author: inputBook.author,
      });
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it('returns the data from the API call exluding passed IDs', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData));

    const targetAuthor = testData.books[0].author;
    const bookIdsToExclude = [testData.books[0].id, testData.books[2].id];

    const matchingBooks = testData.books.filter(
      (book) =>
        book.author === targetAuthor && !bookIdsToExclude.includes(book.id)
    );

    const data = await getBooksByAuthor(targetAuthor, bookIdsToExclude);

    expect(data).toHaveLength(matchingBooks.length);

    matchingBooks.forEach((inputBook, index) => {
      const outputValue = data[index];

      expect(outputValue).toEqual({
        id: inputBook.id,
        cover: inputBook.cover,
        title: inputBook.title,
        author: inputBook.author,
      });
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
  });
});

describe(`${getBook.name}`, () => {
  it('returns null when the API call fails', async () => {
    const error = new Error('failed API call');
    fetchMock.mockRejectOnce(error);

    const data = await getBook(testData.books[1].id);

    expect(data).toBe(null);
    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it('returns null when there is no matching book', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData));

    const data = await getBook('not-found');

    expect(data).toBe(null);
    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it('returns the matching book', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData));

    const itemToMatch = testData.books[1];

    const book = await getBook(itemToMatch.id);

    expect(book).toEqual({
      id: itemToMatch.id,
      cover: itemToMatch.cover,
      isbn: parseIsbn(itemToMatch.isbn),
      title: itemToMatch.title,
      subtitle: itemToMatch.subtitle,
      author: itemToMatch.author,
      published: itemToMatch.published,
      publisher: parseString(itemToMatch.publisher),
      pages: parseNumber(itemToMatch.pages),
      description: parseString(itemToMatch.description),
      website: parseString(itemToMatch.website),
    });

    expect(parseString).toHaveBeenCalledWith(itemToMatch.description);
    expect(parseString).toHaveBeenCalledWith(itemToMatch.publisher);
    expect(parseString).toHaveBeenCalledWith(itemToMatch.website);

    expect(parseNumber).toHaveBeenCalledWith(itemToMatch.pages);
    expect(parseIsbn).toHaveBeenCalledWith(itemToMatch.isbn);

    expect(fetchMock.mock.calls.length).toEqual(1);
  });
});
