import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { getAPI } from '../pixabay-api';



export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ loading: true });
    try {
      const response = await getAPI( query, page );
      this.setState((prevState) => ({
        images: [...prevState.images, ...response.data.hits],
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false });
    }
  };

  handleSearch = (newQuery) => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1
    });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
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
    const { images, loading, showModal, largeImageURL } = this.state;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}
        {images.length > 0 && !loading && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal largeImageURL={largeImageURL} onClose={this.handleCloseModal} />}
      </div>
    );
  }; 
};
