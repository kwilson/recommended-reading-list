import { FunctionComponent } from 'react';

interface IProps {
  loading: boolean;
}

import styles from './LoaderContainer.module.css';

export const LoaderContainer: FunctionComponent<IProps> = ({
  loading,
  children,
}) => {
  const classNames = [styles.container, loading && styles.isLoading]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {loading && (
        <div className="notification" data-testid="loader">
          Loading...
        </div>
      )}
      {!loading && children}
    </div>
  );
};
