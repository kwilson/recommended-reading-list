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
  title: string;
  author: string;
  cover: string;
}

export interface IBookDetails extends IBook {
  isbn: string | null;
  subtitle: string;
  published: string;
  publisher: string | null;
  pages: number | null;
  description: string | null;
  website: string | null;
}

const endpoint = 'https://hokodo-frontend-interview.netlify.app/data.json';

async function getBooksData(): Promise<IBookDataResponse> {
  const data = await fetch(endpoint);
  const values: IBookDataResponse = await data.json();

  return values;
}

export const getBooks = async (): Promise<IBook[]> => {
  try {
    const data = await getBooksData();
    return data.books.map((input) => ({
      author: input.author,
      cover: input.cover,
      id: input.id,
      title: input.title,
    }));
  } catch (e) {
    return [];
  }
};

export const getBooksByAuthor = async (
  author: string,
  exludeIds: string[] = []
): Promise<IBook[]> => {
  try {
    const data = await getBooksData();
    const predicate = (book: IBook) =>
      book.author === author && !exludeIds.includes(book.id);

    return data.books.filter(predicate).map((input) => ({
      author: input.author,
      cover: input.cover,
      id: input.id,
      title: input.title,
    }));
  } catch (e) {
    return [];
  }
};

export const getBook = async (
  id: string | null
): Promise<IBookDetails | null> => {
  try {
    const { books } = await getBooksData();
    const match = books.find((book) => book.id === id);

    if (match) {
      return {
        author: match.author,
        cover: match.cover,
        description: parseString(match.description),
        id: match.id,
        isbn: parseIsbn(match.isbn),
        pages: parseNumber(match.pages),
        published: match.published,
        publisher: parseString(match.publisher),
        subtitle: match.subtitle,
        title: match.title,
        website: parseString(match.website),
      };
    }

    return null;
  } catch (e) {
    return null;
  }
};
