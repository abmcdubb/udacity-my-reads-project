import React from 'react';
import { Link, Route } from 'react-router-dom';
import Bookshelves from './Bookshelves';
import * as BooksAPI from './BooksAPI';

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  moveToShelf = (changedBook, newShelf) => {
    BooksAPI.update(changedBook, newShelf).then((response) => {
      const books = [...this.state.books]
      const changedBookIndex = books.findIndex(book => book.id === changedBook.id)

      books[changedBookIndex].shelf = newShelf
      this.setState({books})
    })
  }

  render() {
    const currentlyReadingBooks = this.state.books.filter(book => book.shelf === 'currentlyReading')
    const wantToReadBooks = this.state.books.filter(book => book.shelf === 'wantToRead')
    const readBooks = this.state.books.filter(book => book.shelf === 'read')
    // what does one do with no shelf books?

    return (
      <div className="app">
        <Route exact path='/' render={() =>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelves name='Currently Reading' books={currentlyReadingBooks} moveToShelf={this.moveToShelf} />
                <Bookshelves name='Want To Read' books={wantToReadBooks} moveToShelf={this.moveToShelf} />
                <Bookshelves name='Read' books={readBooks} moveToShelf={this.moveToShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'
                onClick={this.props.onNavigate}
              >Add a book</Link>
            </div>
          </div>
        )}/>
        <Route exact path='/search' render={() =>(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'
                className='close-search'
                onClick={this.props.onNavigate}
              >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
