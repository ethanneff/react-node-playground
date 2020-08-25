import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
});

type Props = {
  children: React.ReactNode[];
};

export const Apollo = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children} </ApolloProvider>;
};
