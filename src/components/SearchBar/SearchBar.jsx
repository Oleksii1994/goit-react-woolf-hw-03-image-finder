import { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSistrix } from 'react-icons/fa';
import {
  SearchBarHeader,
  SearchForm,
  SearchInput,
  SearchFormBtn,
  SearchFormBtnLabel,
} from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    searchQuerry: '',
  };

  onChange = event => {
    this.setState({ searchQuerry: event.target.value });
  };

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.searchQuerry);
  }

  render() {
    return (
      <SearchBarHeader>
        <SearchForm
          onSubmit={event => {
            this.onSubmit(event);
          }}
        >
          <SearchFormBtn type="submit" className="button">
            <FaSistrix size="24px" />
            <SearchFormBtnLabel className="button-label">
              Search
            </SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
