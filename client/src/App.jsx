import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
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
        <Router>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Projects />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
