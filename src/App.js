import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import Search from './Search';

import './App.css';

class App extends Component {
  state = {
    books: [],
  };

  componentWillMount = () => this._loadBooks();

  _loadBooks = async () => {
    const myBooks = await BooksAPI.getAll();
    this.setState({books: myBooks});
  };

  _updateBook = async updatedBook => {
    const {books} = this.state;
    const otherBook = books.filter(x => x.id !== updatedBook.id);

    this.setState({
      books: [
        ...otherBook,
        {
          ...updatedBook,
          title: `${updatedBook.title} (saving...)`,
        },
      ],
    });

    await BooksAPI.update(updatedBook, updatedBook.shelf);

    this.setState({
      books: [...otherBook, updatedBook],
    });
  };

  _renderBookShelf = () =>
    <BookShelf myBooks={this.state.books} onBookUpdated={this._updateBook} />;

  _renderSearch = () =>
    <Search myBooks={this.state.books} onBookUpdated={this._updateBook} />;

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={this._renderBookShelf} />
          <Route path="/search" render={this._renderSearch} />
        </div>
      </Router>
    );
  }
}

export default App;
