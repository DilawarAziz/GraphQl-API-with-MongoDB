import { gql } from "apollo-boost";
let getBookQuery = gql`
  {
    books {
      name
      id
      genre
    }
  }
`;
let getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;
let addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      id
    }
  }
`;
let addBooksQuery = gql`
  query ($id: ID) {
    Book(id: $id) {
      name
      genre
      id
      author {
        name
        age
        id
        books {
          name
          genre
          id
        }
      }
    }
  }
`;
let deleteBook = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      name
      genre
    }
  }
`;
let updateBook = gql`
  mutation UPDATE($id: ID!, $name: String!, $genre: String!) {
    updateBook(id: $id, name: $name, genre: $genre) {
      name
      id
    }
  }
`;
export {
  getBookQuery,
  getAuthorsQuery,
  addBookMutation,
  addBooksQuery,
  deleteBook,
  updateBook,
};
