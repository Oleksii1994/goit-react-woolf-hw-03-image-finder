import { Component } from 'react';
import { AppComponent } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import axios from 'axios';

const MY_KEY = '34183699-29109d6fbf2dd60241f6d6e15';
const BASE_URL = 'https://pixabay.com/api/';
const OPTIONS_FOR_RESPONSE =
  'image_type=photo&orientation=horizontal&safesearch=true';

export class App extends Component {
  state = {
    searchQuerry: '',
    hits: null,
    page: 1,
    isLoading: false,
    buttonLoading: false,
    showButton: false,
    showModal: false,
    largeImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuerry = prevState.searchQuerry;
    const nextSearchQuerry = this.state.searchQuerry;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuerry !== nextSearchQuerry) {
      try {
        this.setState({ hits: null, page: 1, isLoading: true });
        const res = await axios.get(
          `${BASE_URL}?q=${nextSearchQuerry}&page=1&key=${MY_KEY}&${OPTIONS_FOR_RESPONSE}&per_page=12`
        );

        const responseHits = res.data.hits;
        const filteredData = responseHits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        if (filteredData.length === 0) {
          this.setState({
            isLoading: false,
            hits: filteredData,
            showButton: false,
            buttonLoading: false,
          });
          alert('Enter another word to search');
          return;
        }

        if (filteredData.length < 12) {
          this.setState({
            hits: filteredData,
            isLoading: false,
            showButton: false,
            buttonLoading: false,
          });
          return;
        }

        this.setState({
          hits: filteredData,
          isLoading: false,
          showButton: true,
          buttonLoading: false,
        });
      } catch (e) {
        console.log(e);
      }
    }

    if (prevPage !== nextPage) {
      try {
        if (nextPage === 1) {
          return;
        }
        this.setState({ buttonLoading: true });
        const res = await axios.get(
          `${BASE_URL}?q=${nextSearchQuerry}&page=${nextPage}&key=${MY_KEY}&${OPTIONS_FOR_RESPONSE}&per_page=12`
        );
        const responceHits = res.data.hits;
        const filteredData = responceHits.map(
          ({ id, largeImageURL, webformatURL }) => ({
            id,
            largeImageURL,
            webformatURL,
          })
        );
        const updatedHits = [...this.state.hits, ...filteredData];

        if (filteredData.length < 12) {
          this.setState({
            hits: updatedHits,
            showButton: false,
            isLoading: false,
          });
          return;
        }
        this.setState({
          hits: updatedHits,
          isLoading: false,
          showButton: true,
          buttonLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  onLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };

  handleSubmit(searchWord) {
    this.setState({ searchQuerry: searchWord.toLowerCase().trim() });
  }

  showModal = image => {
    this.setState({ largeImage: image, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImage: '', showModal: false });
  };

  render() {
    const { isLoading, hits, showModal, largeImage, showButton } = this.state;
    return (
      <AppComponent>
        <SearchBar onSubmit={this.handleSubmit.bind(this)} />
        <ImageGallery hits={hits} showModal={this.showModal} />
        {isLoading && <Loader />}
        {showButton && <LoadMoreBtn onClick={this.onLoadMore} />}
        {showModal && (
          <Modal closeModal={this.closeModal} largeImage={largeImage} />
        )}
      </AppComponent>
    );
  }
}
