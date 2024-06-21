import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';
import { getAPI } from '../pixabay-api';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    images: [],
    query: '',
    currentPage: 1,
    isLoading: false,
    isError: false,
    isEnd: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    const { query, currentPage } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    
    try {
      this.setState({ isLoading: true});  
      const { query, currentPage } = this.state;
      const response = await getAPI( query, currentPage );
      const { totalHits, hits } = response;
      console.log(response);

           
      // to display an error message when search does not match any item
      if(hits.length === 0) {
        toast.error('No images found. Try a different search.');
        return;
      } 

      // to display a success message on the first page
      if (currentPage === 1) {
        toast.success(`Great! We found ${totalHits} images!`);
      }

      // to display message if the end of page is reached
      if (currentPage * 12 >= totalHits) {
        this.setState({isEnd: true});
        toast("We're sorry, but you've reached the end of search results.")
      }

      // update the data with new images
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));

    } catch {
      this.setState({ isError: true });
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

  // handleImageClick = (url) => {
  //   this.setState({
  //     largeImageURL: url,
  //     showModal: true,
  //   });
  // };

  // handleCloseModal = () => {
  //   this.setState({
  //     showModal: false,
  //     largeImageURL: '' ,
  //   });
  // };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {images.length >= 1 && !isEnd && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {isError && toast.error('Error fetching images. Please try again.')}
        <Toaster position="top-right" reverseOrder={false} />
        {/* {showModal && <Modal image={largeImageURL} onClose={this.handleCloseModal} />}         */}
      </div>
    );
  }; 
};
