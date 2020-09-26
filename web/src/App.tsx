import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  gql,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: "http://localhost:8080/graphql",
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,

  // Provide some optional constructor fields
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

function App() {
  client
    .query({
      query: gql`
        query allCourses {
          helloWorld
        }
      `,
    })
    .then((result) => console.log(result));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Don't Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
