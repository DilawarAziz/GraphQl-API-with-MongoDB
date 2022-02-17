import logo from "./logo.svg";
import "./App.css";
import AddBook from "./components/addBook";
import BookList from "./components/booklist";
import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

function App() {
  let [id, setid] = useState();
  let getid = (id) => {
    setid(id);
  };
  return (
    <>
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList getid={getid} />
          <AddBook bookdetail={id} />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
