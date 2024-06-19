import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }).isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    const { showModal } = this.state;

    return (
      <li className={styles.galleryItem} onClick={this.toggleModal}>
        <img src={webformatURL} alt={tags} />
        {showModal && (
          <Modal 
            image={largeImageURL} 
            tags={tags} 
            onclose={this.toggleModal} />
        )}
      </li>
    );
  }
}
