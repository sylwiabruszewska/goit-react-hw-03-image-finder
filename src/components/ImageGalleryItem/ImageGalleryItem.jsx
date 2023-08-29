import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = props => {
  const { webformatURL, largeImageURL, tags, onClick } = props;

  const handleImageClick = () => {
    onClick({ webformatURL, largeImageURL, tags });
  };

  return (
    <li className={styles.gallery__item} data-url={largeImageURL}>
      <img
        className={styles.gallery__image}
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={handleImageClick}
      />
    </li>
  );
};
