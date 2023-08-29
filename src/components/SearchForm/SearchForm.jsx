import styles from './SearchForm.module.css';

export const SearchForm = () => {
  return (
    <form className={styles.searchform}>
      <button type="submit" className={styles.searchform__button}>
        <span className={styles.searchform__label}>Search</span>
      </button>

      <input
        className={styles.searchform__input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
};
