// import { setContext } from "apollo-link-context"

// const wrapRootElement = require("./wrap-root-element")``
// const React = require("react")
// const {
//   ApolloProvider,
//   ApolloClient,
//   HttpLink,
//   InMemoryCache,
// } = require("@apollo/client")
// const netlifyIdentity = require("netlify-identity-widget")

// const authLink = setContext((_, { headers }) => {
//   const user = netlifyIdentity.currentUser()
//   const token = user.token.access_token
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   }
// })

// const httpLink = new HttpLink({
//   uri: "https://jamstack-todo-app1.netlify.app/.netlify/functions/graphqll",
// })

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: authLink.concat(httpLink),
// })

// exports.wrapRootElement = ({ element }) => {
//   return (
//     <ApolloProvider client={client}>
//       {wrapRootElement({ element })}
//     </ApolloProvider>
//   )
// }



const React = require("react");
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} = require("@apollo/client");

const { setContext } = require("apollo-link-context");
const netlifyIdentity = require("netlify-identity-widget");

const wrapRootElement = require("./wrap-root-element");

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const httpLink = new HttpLink({
  uri:
  // "https://jamstack-todo-app1.netlify.app/.netlify/functions/graphqll"
  "http://localhost:8888/.netlify/functions/graphqll"
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

exports.wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {wrapRootElement({ element })}
    </ApolloProvider>
  );
};