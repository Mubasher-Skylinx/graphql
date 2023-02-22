import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

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

function App() {
    const client = new ApolloClient({
        uri: "http://localhost:5000/graphql",
        // cache: new InMemoryCache(),
        cache,
    });

    return (
        <>
            <ApolloProvider client={client}>
                <Header />

                <Router>
                    <section className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route path="/project/:id" element={<Project />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </section>
                </Router>
            </ApolloProvider>
        </>
    );
}

export default App;
