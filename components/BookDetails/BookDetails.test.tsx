import { render, screen, waitFor } from '@testing-library/react';

import { getBooksByAuthor, IBook } from '../../data/books';
import { BookDetails } from './BookDetails';

jest.mock('../../data/books');
const mockGetBooksByAuthor = getBooksByAuthor as jest.Mock<
  ReturnType<typeof getBooksByAuthor>
>;

describe(`<${BookDetails.name} />`, () => {
  const props = {
    id: ' value',
    title: 'title value',
    author: 'author value',
    isbn: 'isbn value',
    cover: 'cover value',
  };

  it('renders content as expected', async () => {
    const promise = new Promise<IBook[]>((resolve) => {
      setTimeout(resolve, 1000);
    });
    mockGetBooksByAuthor.mockReturnValueOnce(promise);

    const { asFragment } = render(<BookDetails {...props} />);

    expect(screen.getByTestId('title').textContent).toEqual(props.title);
    expect(screen.getByTestId('author').textContent).toEqual(props.author);
    expect(screen.getByTestId('isbn').textContent).toEqual(props.isbn);
    expect(screen.getByTestId('image').getAttribute('src')).toEqual(
      props.cover
    );
    expect(screen.getByTestId('image').getAttribute('alt')).toEqual(
      expect.stringContaining(props.title)
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders content as expected when there is no ISBN', async () => {
    const promise = new Promise<IBook[]>((resolve) => {
      setTimeout(resolve, 1000);
    });
    mockGetBooksByAuthor.mockReturnValueOnce(promise);

    const { asFragment } = render(<BookDetails {...props} isbn={null} />);

    expect(screen.getByTestId('isbn').textContent).toEqual('not available');

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected when loading', async () => {
    const promise = new Promise<IBook[]>((resolve) => {
      setTimeout(resolve, 1000);
    });
    mockGetBooksByAuthor.mockReturnValueOnce(promise);

    const { asFragment } = render(<BookDetails {...props} />);

    await waitFor(() => screen.getByTestId('loader'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected when loaded with no related books', async () => {
    mockGetBooksByAuthor.mockResolvedValueOnce([]);

    const { asFragment } = render(<BookDetails {...props} />);

    await waitFor(() => screen.getByTestId('empty-book-list'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected when loaded with related books', async () => {
    mockGetBooksByAuthor.mockResolvedValueOnce([
      {
        id: ' value 2',
        title: 'title value 2',
        author: 'author value',
        cover: 'cover value 2',
      },
    ]);

    const { asFragment } = render(<BookDetails {...props} />);

    await waitFor(() => screen.getByTestId('book-list-items'));
    expect(asFragment()).toMatchSnapshot();
  });
});
