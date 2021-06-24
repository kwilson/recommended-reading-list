import { render, screen, waitFor } from '@testing-library/react';

import { getBooks, IBook } from '../../data/books';
import { Home } from '../../pages';

jest.mock('../../data/books');
const mockGetBooks = getBooks as jest.Mock<ReturnType<typeof getBooks>>;

describe(`<${Home.name} />`, () => {
  it('renders as expected when loading', async () => {
    const promise = new Promise<IBook[]>((resolve) => {
      setTimeout(resolve, 1000);
    });
    mockGetBooks.mockReturnValueOnce(promise);

    const { asFragment } = render(<Home />);

    await waitFor(() => screen.getByRole('heading'));

    expect(screen.getByTestId('loader')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected with no data', async () => {
    mockGetBooks.mockResolvedValueOnce([]);

    const { asFragment } = render(<Home />);

    await waitFor(() => screen.getByRole('heading'));

    expect(screen.getByTestId('empty-book-list')).toBeDefined();
    expect(screen.queryByTestId('loader')).toBe(null);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected with data', async () => {
    mockGetBooks.mockResolvedValueOnce([
      {
        id: 'id',
        title: 'title',
        author: 'author',
        cover: 'cover',
      },
    ]);

    const { asFragment } = render(<Home />);

    await waitFor(() => screen.getByRole('heading'));

    expect(screen.queryByTestId('empty-book-list')).toBe(null);
    expect(screen.queryByTestId('loader')).toBe(null);
    expect(asFragment()).toMatchSnapshot();
  });
});
