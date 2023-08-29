import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.box}>
      <Oval className={styles.loader} ariaLabel="Loading indicator" />
    </div>
  );
};
