
const React = require("react");
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} = require("@apollo/client");

const wrapRootElement = require("./wrap-root-element");

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri:
    "https://jamstack-todo-app1.netlify.app/.netlify/functions/graphqll"
  })
});

exports.wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {wrapRootElement({ element })}
    </ApolloProvider>
  );
};