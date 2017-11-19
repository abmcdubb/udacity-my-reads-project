import React from 'react'
import PropTypes from 'prop-types'

function BookShelves (props) {
  const {books, moveToShelf} = props
  const showSearchResults = !props.searchPage || books.length > 0
  const shelfTitle = props.name === 'None' ? 'Search Results' : props.name

  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      {showSearchResults ? (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <div key={book.id} className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf || 'none'} onChange={(event) => (moveToShelf(book, event.target.value))}>
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors && (
                      book.authors.map((author) => (
                        <div key={author} className="author">{author}</div>
                      ))
                    )}
                  </div>
                </div>
              </li>
              ))
            }
          </ol>
        </div>
        ) : (
        <div className='no-search-results'>No books match this search term</div>
        )
      }
    </div>
  )
}

BookShelves.propTypes = {
  books: PropTypes.array.isRequired,
  moveToShelf: PropTypes.func.isRequired,
  searchPage: PropTypes.bool.isRequired,
}

export default BookShelves
