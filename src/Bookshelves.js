import React, {Component} from 'react'
// import Books from './Books'
// i guess i should import prop types here?

class BookShelves extends Component {

  render() {
    const {moveToShelf} = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <div key={book.id} className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => (moveToShelf(book, event.target.value))}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    { book.authors.map((author) => (
                      <div key={author} className="author">{author}</div>
                      ))
                    }
                  </div>
                </div>
              </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelves
