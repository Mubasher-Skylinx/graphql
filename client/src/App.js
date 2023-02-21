import "./App.css";
import AddClientModal from "./components/AddClientModal";
import Clients from "./components/Clients";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

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
                <AddClientModal />
                <Clients />
            </ApolloProvider>
        </>
    );
}

export default App;
