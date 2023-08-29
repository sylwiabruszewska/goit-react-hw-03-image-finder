import styles from './Modal.module.css';

export const Modal = ({ largeImageURL, tags, onClick }) => {
  const { image, modal, overlay } = styles;

  return (
    <div className={overlay}>
      <div className={modal}>
        <img
          className={image}
          src={largeImageURL}
          alt={tags}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
