import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';

const shelfMap = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read',
};

class BookShelf extends Component {
  _getShelfves = () => {
    const {myBooks} = this.props;
    return myBooks.reduce(
      (shelves, book) => {
        shelves[book.shelf].push(book);
        return shelves;
      },
      {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      }
    );
  };

  _renderBook = book =>
    <li key={book.id}>
      <Book book={book} onBookUpdated={this.props.onBookUpdated} />
    </li>;

  _renderShelf = (title, books) =>
    <div className="bookshelf" key={title}>
      <h2 className="bookshelf-title">
        {title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(this._renderBook)}
        </ol>
      </div>
    </div>;

  render() {
    const shelves = this._getShelfves();
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {Object.keys(shelves).map(key =>
            this._renderShelf(shelfMap[key], shelves[key])
          )}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelf;