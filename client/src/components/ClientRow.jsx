import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow(props) {
    const { client } = props;

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // refetchQueries: [{ query: GET_CLIENTS }], // ONE WAY
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }], // ONE WAY

        // SECOND WAY
        // update(cache, { data: { deleteClient } }) {
        //     const { clients } = cache.readQuery({
        //         query: GET_CLIENTS,
        //     });

        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {
        //             clients: clients.filter((client) => client.id !== deleteClient.id),
        //         },
        //     });
        // },
    });

    const handleClientDelete = () => {
        deleteClient();
    };

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={handleClientDelete}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}
