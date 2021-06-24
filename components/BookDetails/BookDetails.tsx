import { FunctionComponent, useEffect, useState } from 'react';
import { IBook } from '../../data/books';
import { getBooksByAuthor } from '../../data/books';
import { LoaderContainer } from '../LoaderContainer';
import { BookList } from '../BookList';

import styles from './BookDetails.module.css';

interface IProps {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  cover: string;
}

export const BookDetails: FunctionComponent<IProps> = ({
  id,
  title,
  author,
  isbn,
  cover,
}) => {
  const [relatedBooks, setRelatedBooks] = useState<IBook[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getBooksByAuthor(author, [id])
      .then(setRelatedBooks)
      .then(() => setIsLoading(false));
  }, [author, id]);

  return (
    <div className={styles.container} data-testid="book-details">
      <h1 className={styles.title} data-testid="title">
        {title}
      </h1>
      <div className={styles.author}>
        by <span data-testid="author">{author}</span>
      </div>
      <div className={styles.isbn}>
        ISBN: <span data-testid="isbn">{isbn ?? 'not available'}</span>
      </div>

      <div className={styles.image}>
        <img
          data-testid="image"
          className={styles.image}
          src={cover}
          alt={`${title} book cover`}
        />
      </div>

      <aside className={styles.otherBooks}>
        <h2>Other books by this author</h2>
        <LoaderContainer loading={isLoading}>
          {relatedBooks && <BookList books={relatedBooks} />}
        </LoaderContainer>
      </aside>
    </div>
  );
};
