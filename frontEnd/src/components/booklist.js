import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBookQuery, deleteBook } from "../querry/querry";
import { gql } from "apollo-boost";
import BookDetail from "./BookDetail";
import { flowRight as compose } from "lodash";
const BookList = (props) => {
  const [id, setid] = useState(null);
  //   console.log(data.books);
  let data = props.getBookQuery;
  const deltebook = (id) => {
    props.deleteBook({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: getBookQuery }],
    });
  };
  return (
    <div>
      <ul id="book-list">
        {data.books?.map((items, index) => (
          <li key={index}>
            <p
              onClick={() => {
                setid(items.id);
              }}
              style={{ margin: "0px", width: "20%" }}
            >
              {items.name}
            </p>

            <p
              onClick={() => {
                props.getid(items);
              }}
              style={{ margin: "0px" }}
            >
              Update
            </p>
            <p onClick={() => deltebook(items.id)} style={{ margin: "0px" }}>
              Delete
            </p>
          </li>
        ))}
      </ul>
      <BookDetail bookid={id} />
    </div>
  );
};

export default compose(
  graphql(getBookQuery, { name: "getBookQuery" }),
  graphql(deleteBook, { name: "deleteBook" })
)(BookList);
