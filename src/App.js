import React from 'react';
import { Link, Route } from 'react-router-dom';
import Bookshelves from './Bookshelves';
import * as BooksAPI from './BooksAPI';
import sortBy from 'sort-by'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchQuery: '',
    searchResultBooks: [],
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
      // this.clearSearchQuery()
    })
  }
  moveToShelf = (changedBook, newShelf) => {
    BooksAPI.update(changedBook, newShelf).then((response) => {
      const books = [...this.state.books]
      const changedBookIndex = books.findIndex(book => book.id === changedBook.id)
      const book = books[changedBookIndex]

      // modifies book if already in array, adds book to books array if not
      if (book) {
        books[changedBookIndex].shelf = newShelf
      }
      else {
        changedBook.shelf = newShelf
        books.push(changedBook)
      }

      this.setState({books})
    })
  }
  updateSearchQuery = (query) => {
    this.setState({searchQuery: query })

    if (query.length > 0) {
      BooksAPI.search(query).then((response) => {
        if (response && !response['error']) {
          this.syncBookShelves(response)
          this.setState({searchResultBooks: response.sort(sortBy('title'))})
        }
        else {
          this.clearSearchQuery()
          this.setState({noSearchResults: true})
        }
      })
    }
    else {
      this.clearSearchQuery()
    }
  }
  clearSearchQuery = () => {
    this.setState({searchResultBooks: []})
  }
  // updates search results with shelf info if book is already part of shelved books collection
  syncBookShelves = (searchResultBooks) => {
    const searchBookIds = searchResultBooks.map((book) => book.id)

    this.state.books.forEach((shelvedBook) => {
      if (searchBookIds.includes(shelvedBook.id)) {
        this.findAndUpdateBookShelf(searchResultBooks, shelvedBook)
      }
    })
  }
  findAndUpdateBookShelf = (books, bookToShelve) => {
    const bookIndex = books.findIndex((book) => book.id === bookToShelve.id)
    books[bookIndex].shelf = bookToShelve.shelf
  }

  render() {
    const currentlyReadingBooks = this.state.books.filter(book => book.shelf === 'currentlyReading').sort(sortBy('title'))
    const wantToReadBooks = this.state.books.filter(book => book.shelf === 'wantToRead').sort(sortBy('title'))
    const readBooks = this.state.books.filter(book => book.shelf === 'read').sort(sortBy('title'))

    const {searchQuery, searchResultBooks} = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() =>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelves name='Currently Reading' books={currentlyReadingBooks} moveToShelf={this.moveToShelf} searchPage={false}/>
                <Bookshelves name='Want To Read' books={wantToReadBooks} moveToShelf={this.moveToShelf} searchPage={false}/>
                <Bookshelves name='Read' books={readBooks} moveToShelf={this.moveToShelf} searchPage={false}/>
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
                <input
                  type='text'
                  placeholder='Search by title or author'
                  value={searchQuery}
                  onChange={(event) => (this.updateSearchQuery(event.target.value))}
                />

              </div>
            </div>
            <div className="search-books-results">
              <Bookshelves name='None' books={searchResultBooks} moveToShelf={this.moveToShelf} searchPage={true}/>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
