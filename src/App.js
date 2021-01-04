import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  ApolloClient,
  gql,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";

// const EXCHANGE_RATES = gql`
//   query GetExchangeRates {
//     rates(currency: "USD") {
//       currency
//       rate
//     }
//   }
// `;

const query = gql`
  {
    bikeParks {
      id
      name
      lat
      long
    }
  }
`;

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  cache: new InMemoryCache(),
});

function ExchangeRates() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data.bikeParks.map((bikePark) => (
        <div key={bikePark.id}>
          {bikePark.name} - {JSON.parse(bikePark.lat)} -{" "}
          {JSON.parse(bikePark.long)}
        </div>
      ))}
    </>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <ApolloProvider client={client}>
            <ExchangeRates />
          </ApolloProvider>
        </header>
      </div>
    );
  }
}

export default App;
