import { useQuery } from "@apollo/client";
import React from "react";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

function Clients() {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (error) {
        return <h2>{error}</h2>;
    }

    return loading ? (
        <Spinner />
    ) : (
        <table className="table table-hover mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.clients.map?.((client) => (
                    <ClientRow key={client.id} client={client} />
                ))}
            </tbody>
        </table>
    );
}

export default Clients;
