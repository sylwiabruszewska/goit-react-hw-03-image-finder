import { Component } from 'react';
import styles from './ImageGallery.module.css';

import { Button, ImageGalleryItem, Loader, Modal } from '../index';
import { getImages } from 'services/api';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    selectedImage: null,
    isModalOpen: false,
  };

  // obsługa update komponentu - nowe query i nowe page
  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const query = this.props.searchQuery;

    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.fetchImages(query, 1);
    }
    if (this.state.page !== prevState.page) {
      this.loadMoreImages(query, page);
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

  // button handler - page + 1
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // pobieranie obrazków na nowe page
  async loadMoreImages(query, page) {
    this.setState({ isLoading: true });
    const response = await getImages(query, page);
    const data = response.data.hits;
    this.setState(prevState => ({
      images: [...prevState.images, ...data],
      isLoading: false,
    }));
  }

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

    if (isLoading) {
      return <Loader />;
    }

    return (
      <div>
        <ul className={styles.gallery}>
          {images.map(({ id, ...rest }) => (
            <ImageGalleryItem
              key={id}
              {...rest}
              onClick={this.openModal}
            ></ImageGalleryItem>
          ))}
        </ul>

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
