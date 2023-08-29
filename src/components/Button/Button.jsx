import styles from './Button.module.css';

export const Button = ({ onClick, children }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
