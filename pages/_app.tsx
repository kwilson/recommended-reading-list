import type { AppProps /*, AppContext */ } from 'next/app';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function AppTemplate({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        :root {
          --border-color: black;
        }

        .container {
          padding: 0 1rem;
          margin: 0 auto;
          max-width: 960px;
        }

        .banner {
          padding: 0.5rem 0;
          border-bottom: solid 1px var(--border-color);
        }
      `}</style>

      <div className="banner">Recommended Reading List</div>
      <Component {...pageProps} />
    </div>
  );
}

export default AppTemplate;
