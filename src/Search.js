import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import debounce from 'lodash/debounce';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
  state = {
    results: [],
  };

  _onSearchChanged = event => this._searchApi(event.target.value);

  _renderBook = book =>
    <li key={book.id}>
      <Book book={book} onBookUpdated={this.props.onBookUpdated} />
    </li>;

  _searchApi = debounce(async value => {
    const results = await BooksAPI.search(value);
    this.setState({results});
  }, 500);

  render() {
    const {results} = this.state;
    const {myBooks} = this.props;
    const mergedBooks = results.map(result => {
      const found = myBooks.find(book => book.id === result.id);
      if (found) {
        return {
          ...result,
          shelf: found.shelf,
        };
      }
      return result;
    });
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              autoFocus
              type="text"
              placeholder="Search by title or author"
              onChange={this._onSearchChanged}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <ol className="books-grid">
              {mergedBooks.map(this._renderBook)}
            </ol>
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;
