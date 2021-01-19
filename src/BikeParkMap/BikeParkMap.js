import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Header from "./Header/Header";
import Map from "./Map/Map";
import InformationBar from "./InformationBar/InformationBar";
import { BikeParkMapProvider } from "./BikeParkMap.context";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  cache: new InMemoryCache(),
});

const BikeParkMap = () => {
  return (
    <ApolloProvider client={client}>
      <BikeParkMapProvider>
        <Header />
        <Map />
        <InformationBar />
      </BikeParkMapProvider>
    </ApolloProvider>
  );
};

export default BikeParkMap;
