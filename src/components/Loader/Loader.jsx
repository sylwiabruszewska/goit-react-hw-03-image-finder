import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.box}>
      <Oval
        className={styles.loader}
        ariaLabel="Loading indicator"
        height="100"
        width="100"
        color="#3f51b5"
        secondaryColor="#5067ec"
      />
    </div>
  );
};
