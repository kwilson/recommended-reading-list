import { FunctionComponent } from 'react';

import { BookListItem } from '../BookListItem';
import { IBook } from '../../data/books';

import styles from './BookList.module.css';

interface IProps {
  books: IBook[];
}

export const BookList: FunctionComponent<IProps> = ({ books = [] }) => {
  return (
    <div className={styles.container}>
      {books.length === 0 && (
        <div data-testid="empty-book-list">
          <p>Sorry, there are no books to display.</p>
        </div>
      )}

      {books.length > 0 && (
        <div data-testid="book-list-items">
          {books.map(({ id, author, title, cover }) => (
            <BookListItem
              key={id}
              author={author}
              cover={cover}
              title={title}
              link={`/${id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
