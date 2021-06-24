import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import {
  getBook,
  getBooksByAuthor,
  IBook,
  IBookDetails,
} from '../../../data/books';
import BookDetails from '../../../pages/[bookId]';

jest.mock('../../../data/books');
const mockGetBook = getBook as jest.Mock<ReturnType<typeof getBook>>;
const mockGetBooksByAuthor = getBooksByAuthor as jest.Mock<
  ReturnType<typeof getBooksByAuthor>
>;

jest.mock('next/router');
const mockRouter = useRouter as jest.Mock<ReturnType<typeof useRouter>>;

describe(`<${BookDetails.name} />`, () => {
  it('renders as expected when loading', async () => {
    const promise = new Promise<IBookDetails>((resolve) => {
      setTimeout(resolve, 1000);
    });
    mockGetBook.mockReturnValueOnce(promise);

    const { asFragment } = render(<BookDetails />);

    await waitFor(() => screen.getByTestId('loader'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected when loaded', async () => {
    const book: IBookDetails = {
      id: 'id value',
      title: 'title value',
      author: 'author value',
      cover: 'cover value',
      isbn: null,
      subtitle: 'subtitle value',
      published: 'published value',
      publisher: null,
      pages: null,
      description: null,
      website: null,
    };

    mockRouter.mockReturnValueOnce({
      query: { bookId: '1' },
    } as any);

    mockGetBook.mockResolvedValueOnce(book);

    const promise = new Promise<IBook[]>((resolve) => {
      setTimeout(resolve, 1000);
    });
    mockGetBooksByAuthor.mockReturnValueOnce(promise);

    const { asFragment } = render(<BookDetails />);

    await waitFor(() => screen.getByTestId('book-details'));
    await waitFor(() => screen.getByText(book.title));
    expect(asFragment()).toMatchSnapshot();
  });

  it.only('redirects if the book fails to load', async () => {
    mockRouter.mockReturnValueOnce({
      query: { bookId: '1' },
    } as any);

    mockGetBook.mockResolvedValueOnce(null);

    const promise = new Promise<IBook[]>((resolve) => {
      setTimeout(resolve, 1000);
    });
    mockGetBooksByAuthor.mockReturnValueOnce(promise);

    const { asFragment } = render(<BookDetails />);

    await waitFor(() => screen.getByTestId('not-found'));

    expect(asFragment()).toMatchSnapshot();
  });
});
