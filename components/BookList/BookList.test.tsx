import { render, screen } from '@testing-library/react';

import { IBook } from '../../data/books';
import { BookList } from './BookList';

describe(`<${BookList.name} />`, () => {
  it('renders as expected when there are no books', async () => {
    const { asFragment } = render(<BookList books={[]} />);

    expect(screen.getByTestId('empty-book-list')).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected when there are books', async () => {
    const testData: IBook[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => ({
      id: `id-${key}`,
      cover: `url://${key}`,
      title: `title-${key}`,
      author: `author-${key % 2}`,
    }));

    const { asFragment } = render(<BookList books={testData} />);

    expect(screen.queryByTestId('empty-book-list')).toBe(null);

    testData.forEach((book) => {
      expect(screen.getByText(book.title)).toBeDefined();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
