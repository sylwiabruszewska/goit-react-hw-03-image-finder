import styles from './Searchbar.module.css';

import { SearchForm } from '../index';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = query => {
    onSubmit(query);
  };

  return (
    <header className={styles.searchbar}>
      <SearchForm onSubmit={handleSubmit} />
    </header>
  );
};
