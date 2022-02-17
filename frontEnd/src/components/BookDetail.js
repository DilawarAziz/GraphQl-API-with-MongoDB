import { addBooksQuery } from "../querry/querry";
import { graphql } from "react-apollo";

const BookDetails = (props) => {
  const { Book } = props?.data;

  return (
    <div id="book-details">
      {Book && (
        <div>
          <h2>{Book.name}</h2>
          <p>{Book.genre}</p>
          <p>{Book.author.name}</p>
          <p>All Books by this author:</p>
          <ul className="other-books">
            {Book.author.books.map((item) => (
              //  console.log(item)
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default graphql(addBooksQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookid,
      },
    };
  },
})(BookDetails);
