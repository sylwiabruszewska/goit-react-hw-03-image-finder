import { Component, createRef } from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import { Button, ImageGalleryItem, Loader, Modal } from '../index';
import { getImages } from 'services/api';

export class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.listRef = createRef();
  }

  state = {
    images: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    selectedImage: null,
    isModalOpen: false,
    scrollPosition: 0,
  };

  getSnapshotBeforeUpdate(_, prevState) {
    if (prevState.images.length < this.state.images.length) {
      const list = this.listRef.current;
      const newScrollPosition = list.scrollHeight - list.scrollTop;
      return newScrollPosition;
    }
    return null;
  }

  // obsługa update komponentu - nowe query i nowe page
  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { page } = this.state;
    const query = this.props.searchQuery;

    if (this.props.searchQuery !== prevProps.searchQuery) {
      await this.fetchImages(query, 1);
    }
    if (this.state.page !== prevState.page) {
      await this.loadMoreImages(query, page);

      this.setState({
        scrollPosition: snapshot,
      });
    }
  }

  // pobieranie obrazków na nowe query
  async fetchImages(query, page) {
    this.setState({ isLoading: true });
    const response = await getImages(query, page);
    const data = response.data.hits;
    const totalPages = Math.floor(response.data.total / 12);
    this.setState({
      images: data,
      page: 1,
      totalPages: totalPages,
      isLoading: false,
    });
  }

  // pobieranie obrazków na nowe page
  async loadMoreImages(query, page) {
    this.setState({ isLoading: true });
    const response = await getImages(query, page);
    const data = response.data.hits;
    this.setState(prevState => ({
      images: [...prevState.images, ...data],
      isLoading: false,
    }));

    const list = this.listRef.current;
    list.scrollTo({ top: this.state.scrollPosition, behavior: 'smooth' });
  }

  // button handler - page + 1
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // otwieranie modala
  openModal = image => {
    this.setState({ selectedImage: image, isModalOpen: true });
  };

  // zamykanie modala
  closeModal = () => {
    this.setState({ selectedImage: null, isModalOpen: false });
  };

  render() {
    const { images, page, totalPages, isLoading, selectedImage } = this.state;

    return (
      <div>
        <ul className={styles.gallery} ref={this.listRef}>
          {images.map(({ id, ...rest }) => (
            <ImageGalleryItem
              key={id}
              {...rest}
              onClick={this.openModal}
            ></ImageGalleryItem>
          ))}
        </ul>

        {isLoading && <Loader />}

        {page < totalPages && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}

        {selectedImage && (
          <Modal
            largeImageURL={this.state.selectedImage.largeImageURL}
            tags={this.state.selectedImage.tags}
            onClick={this.closeModal}
          />
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
