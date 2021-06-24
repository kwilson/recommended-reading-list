import { FunctionComponent } from 'react';
import Link from 'next/link';

interface IProps {
  author: string;
  cover: string;
  link: string;
  title: string;
}

import styles from './BookListItem.module.css';

export const BookListItem: FunctionComponent<IProps> = ({
  author,
  cover,
  title,
  link,
}) => (
  <div className={styles.container}>
    <div className={styles.details}>
      <h2 className={styles.title} data-testid="book-title">
        {title}
      </h2>
      <div className={styles.author}>
        by <span data-testid="book-author">{author}</span>
      </div>

      <div className={styles.link} data-testid="book-link">
        <Link href={link}>More Info</Link>
      </div>
    </div>

    <div className={styles.cover}>
      <img
        data-testid="book-image"
        src={cover}
        alt={`${title} book cover`}
        className={styles.coverImage}
      />
    </div>
  </div>
);
