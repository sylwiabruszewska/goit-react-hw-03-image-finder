import { Component } from 'react';
import styles from './ImageGallery.module.css';

import { Button, ImageGalleryItem } from '../index';
import { getImages } from 'services/api';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
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
    const response = await getImages(query, page);
    this.setState({ images: response, page: 1 });
  }

  // button handler - page + 1
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // pobieranie obrazków na nowe page
  async loadMoreImages(query, page) {
    const moreImages = await getImages(query, page);
    this.setState(prevState => ({
      images: [...prevState.images, ...moreImages],
    }));
  }

  render() {
    const { images } = this.state;

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
        {images.length && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
