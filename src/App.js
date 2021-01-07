import React, { Component } from "react";
import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import BikeParkMap from "./BikeParkMap/BikeParkMap";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ApolloProvider client={client}>
            <BikeParkMap />
          </ApolloProvider>
        </header>
      </div>
    );
  }
}

export default App;
