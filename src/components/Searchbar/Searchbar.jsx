import styles from './Searchbar.module.css';

import { SearchForm } from '../index';

export const Searchbar = () => {
  return (
    <header className={styles.searchbar}>
      <SearchForm />
    </header>
  );
};
