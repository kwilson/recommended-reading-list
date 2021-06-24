import Head from 'next/head';
import { FunctionComponent, useEffect, useState } from 'react';

import { BookList } from '../components/BookList';
import { LoaderContainer } from '../components/LoaderContainer';

import { getBooks, IBook } from '../data/books';

export const Home: FunctionComponent = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getBooks()
      .then(setBooks)
      .then(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <Head>
        <title>Recommended Reading List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title" data-testid="title">
        All Books
      </h1>

      <LoaderContainer loading={isLoading}>
        <BookList books={books} />
      </LoaderContainer>
    </div>
  );
};

export default Home;
