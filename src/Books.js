import React, {Component} from 'react'

// maybe this doesn't need to extend component and can just be a function?
class Books extends Component {

  render() {
    const {book, moveToShelf} = this.props

    return (
      <div key={this.props.book.id} className="book">
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
    )
  }
}

export default Books
