import React, { useEffect, useState } from "react";
import { graphql } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  updateBook,
  getBookQuery,
} from "../querry/querry";
import { flowRight as compose } from "lodash";
const Booklist = (props) => {
  const [author, setauthor] = useState();
  const [addbook, setbook] = useState({
    name: props.bookdetail?.name,
    genre: props.bookdetail?.genre,
  });
  let name, value;
  let handleinput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setbook({ ...addbook, [name]: value });
  };
  let authorsdata = props.getAuthorsQuery.authors;
  let bookquery = props.updateBook;
  useEffect(() => {
    setbook({ name: props?.bookdetail?.name, genre: props?.bookdetail?.genre });
  }, [props.bookdetail]);
  let submitdata = (e) => {
    e.preventDefault();

    props.addBookMutation({
      variables: {
        name: addbook.name,
        genre: addbook.genre,
        authorid: author,
      },
      refetchQueries: [{ query: getBookQuery }],
    });
  };
  let update = () => {
    props.updateBook({
      variables: {
        id: props.bookdetail.id,
        name: addbook.name,
        genre: addbook.genre,
      },
      refetchQueries: [{ query: getBookQuery }],
    });
  };
  return (
    <div className="add-book-pt">
      <form onSubmit={submitdata} id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input
            onChange={handleinput}
            value={addbook.name}
            name="name"
            type="text"
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            name="genre"
            onChange={handleinput}
            value={addbook.genre}
            type="text"
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={(e) => {
              setauthor(e.target.value);
            }}
          >
            <option selected disabled>
              Select Author
            </option>
            {authorsdata?.map((items, index) => (
              <option name={items.id} value={items.id} key={index}>
                {items.name}
              </option>
            ))}
          </select>
        </div>
        <button onSubmit={submitdata} type="submit">
          +
        </button>
        <button onClick={update}>U</button>
      </form>
    </div>
  );
};
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(updateBook, { name: "updateBook" })
)(Booklist);
