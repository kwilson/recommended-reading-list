import Head from 'next/head';
import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { BookDetails as BookDetailsCmp } from '../../components/BookDetails';
import { LoaderContainer } from '../../components/LoaderContainer';
import { getBook, IBookDetails } from '../../data/books';

export const BookDetails: FunctionComponent = () => {
  const router = useRouter();

  const [book, setBook] = useState<IBookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const bookId = router?.query?.bookId as string;

  useEffect(() => {
    if (bookId) {
      setIsLoading(true);
      getBook(bookId)
        .then(setBook)
        .then(() => setIsLoading(false));
    }
  }, [bookId]);

  if (!isLoading && book === null) {
    return (
      <div data-testid="not-found">
        <Head>
          <title>Not Found</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Not Found</h1>
        <p>Sorry, the book you are trying to view has not been found.</p>

        <p>
          <Link href="/">Back to book list</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>
          {book?.title} by {book?.author}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoaderContainer loading={isLoading}>
        {book && <BookDetailsCmp {...book} />}
      </LoaderContainer>

      <p>
        <Link href="/">Back to book list</Link>
      </p>
    </div>
  );
};

export default BookDetails;
