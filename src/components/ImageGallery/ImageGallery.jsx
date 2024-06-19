import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

export class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
    onImageClick: PropTypes.func.isRequired,
  };

  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className={styles.gallery}>
          {images.map((image) => (
              <li
                key={image.id}
                className={styles.galleryItem}
                onClick={() => onImageClick(image.largeImageURL)}
              >
              <ImageGalleryItem image={image} />
              </li>
          ))}
      </ul>
    );
  }
}
