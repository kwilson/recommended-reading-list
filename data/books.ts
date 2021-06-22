import { parseIsbn, parseString, parseNumber } from '../utils/data-parser';

export interface IBookDataResponseItem {
  id: string;
  cover: string;
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher?: string;
  pages?: number;
  description?: string;
  website?: string;
}

export interface IBookDataResponse {
  books: IBookDataResponseItem[];
}

export interface IBook {
  id: string;
  cover: string;
  isbn: string | null;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string | null;
  pages: number | null;
  description: string | null;
  website: string | null;
}

const endpoint = 'https://hokodo-frontend-interview.netlify.app/data.json';

export const getBooks = async (): Promise<IBook[]> => {
  try {
    const data = await fetch(endpoint);
    const values: IBookDataResponse = await data.json();

    return values.books.map((input) => ({
      id: input.id,
      cover: input.cover,
      isbn: parseIsbn(input.isbn),
      title: input.title,
      subtitle: input.subtitle,
      author: input.author,
      published: input.published,
      publisher: parseString(input.publisher),
      pages: parseNumber(input.pages),
      description: parseString(input.description),
      website: parseString(input.website),
    }));
  } catch (e) {
    return [];
  }
};
