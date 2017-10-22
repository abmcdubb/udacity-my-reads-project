import React, {Component} from 'react'
import Books from './Books'
// i guess i should import prop types here?

class BookShelves extends Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Books book={book}/>
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
