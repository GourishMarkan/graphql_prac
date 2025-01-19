import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Client from "./components/Client";

function App() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache,
  });
  return (
    <>
      <ApolloProvider client={client}>
        <Client />
      </ApolloProvider>
    </>
  );
}

export default App;
