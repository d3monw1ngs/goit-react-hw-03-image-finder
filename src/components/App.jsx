import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { getAPI } from '../pixabay-api';
import styles from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    currentPage: 1,
    isLoading: false,
    isError: false,
    isEnd: false,
  };

  async componentDidUpdate(_prevProps, prevState) {
    const { query, currentPage } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true});

    const { query, currentPage } = this.state;

    try {
      const response = await getAPI( query, currentPage );
      console.log(response);
      const { totalHits, hits } = response;

      this.setState(prevState => ({
        images: currentPage === 1 ? hits: [...prevState.images, ...hits],
        isLoading: false,
        isEnd: prevState.images.length + hits.length >= totalHits,
      }));
     

      if(hits.length === 0) {
        alert('No images found. Try a different search.');
        return;
      } 
    } catch (error) {
      this.setState({ isError: true });
      alert(`Error fetching images: ${error}`);
      } finally {
        this.setState({ isLoading: false });
      }
    };

  handleSearch = (newQuery) => {
    this.setState({
      query: newQuery,
      images: [],
      currentPage: 1,
      isEnd: false,
    });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleImageClick = (url) => {
    this.setState({
      largeImageURL: url,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {isError && <p>Error fetching images. Please try again.</p>}
        {isLoading && images.length > 0 && !isEnd && <Button onClick={this.handleLoadMore} />}
        </div>
    );
  }; 
};
