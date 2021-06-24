import { render, screen } from '@testing-library/react';

import { BookListItem } from './BookListItem';

describe(`<${BookListItem.name} />`, () => {
  it('renders as expected', async () => {
    const props = {
      author: 'author value',
      cover: 'cover value',
      title: 'title value',
      link: 'link value',
    };

    const { asFragment } = render(<BookListItem {...props} />);

    expect(screen.queryByTestId('empty-book-list')).toBe(null);

    expect(screen.getByTestId('book-title').textContent).toEqual(props.title);
    expect(screen.getByTestId('book-author').textContent).toEqual(props.author);

    expect(screen.getByTestId('book-image').getAttribute('src')).toEqual(
      props.cover
    );
    expect(screen.getByTestId('book-image').getAttribute('alt')).toEqual(
      expect.stringContaining(props.title)
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
