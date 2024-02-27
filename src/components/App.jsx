import { Component } from 'react';
import { AppComponent } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getImages } from 'api/api';

export class App extends Component {
  state = {
    searchQuerry: '',
    hits: [],
    page: 1,
    isLoading: false,
    buttonLoading: false,
    showButton: false,
    showModal: false,
    largeImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchQuerry = prevState.searchQuerry;
    const { searchQuerry } = this.state;
    const prevPage = prevState.page;
    const { page } = this.state;

    if (prevSearchQuerry !== searchQuerry || prevPage !== page) {
      try {
        this.setState({
          isLoading: true,
        });

        const { hits, totalHits } = await getImages(searchQuerry, page);

        if (hits.length === 0) {
          this.setState({
            isLoading: false,
          });
          alert('Enter another word to search');
          return;
        }

        const filteredData = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        this.setState(prevState => ({
          hits: [...prevState.hits, ...filteredData],
          showButton: page < Math.ceil(totalHits / 12),
          buttonLoading: false,
        }));
      } catch (e) {
        console.log(e);
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit(searchWord) {
    this.setState({
      searchQuerry: searchWord.toLowerCase().trim(),
      hits: [],
      page: 1,
      isLoading: false,
      buttonLoading: false,
      showButton: false,
      showModal: false,
      largeImage: '',
    });
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
