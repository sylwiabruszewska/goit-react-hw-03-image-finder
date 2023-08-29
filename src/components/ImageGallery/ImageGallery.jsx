import { Component } from 'react';
import styles from './ImageGallery.module.css';

import { ImageGalleryItem } from '../index';
import * as api from 'services/api';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
  };

  async componentDidMount() {
    const response = await api.getImages('grey cat');
    this.setState({ images: response });
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
      </div>
    );
  }
}
