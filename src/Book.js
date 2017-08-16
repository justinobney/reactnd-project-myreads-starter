import React, {Component} from 'react';
import PropTypes from 'prop-types';

export const bookShape = PropTypes.shape({
  imageLinks: PropTypes.object.isRequired,
  shelf: PropTypes.string,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
});

class Book extends Component {
  static propTypes = {
    book: bookShape,
  };
  _updateShelf = event => {
    const {book, onBookUpdated} = this.props;
    onBookUpdated({
      ...book,
      shelf: event.target.value,
    });
  };
  render() {
    const {book} = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf || ''} onChange={this._updateShelf}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title}
        </div>
        <div className="book-authors">
          {(book.authors || []).join(', ')}
        </div>
      </div>
    );
  }
}

export default Book;
