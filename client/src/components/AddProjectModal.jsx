import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddProjectModal() {
    const { loading: clientsLoading, error, data: clientsData } = useQuery(GET_CLIENTS);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new");

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },

        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: projects.concat([addProject]) },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || description === "" || clientId === "") {
            return alert("Please fill in all fields");
        }

        console.log(name, description, clientId, status);
        addProject(name, description, clientId, status);

        setName("");
        setDescription("");
        setClientId("");
        setStatus("new");
    };

    if (error) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addProjectModal"
            >
                <div className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>New Project</div>
                </div>
            </button>

            <div
                className="modal fade"
                id="addProjectModal"
                aria-labelledby="addProjectModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProjectModalLabel">
                                New Project
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                {!clientsLoading && (
                                    <div className="mb-3">
                                        <label className="form-label">Client ID</label>
                                        <select
                                            name="status"
                                            id="status"
                                            className="form-select"
                                            value={clientId}
                                            onChange={(e) => setClientId(e.target.value)}
                                        >
                                            <option>Select Client</option>

                                            {clientsData.clients.map((client) => {
                                                return (
                                                    <option value={client.id} key={client.id}>
                                                        {client.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="form-select"
                                        defaultValue={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="new">No Started</option>
                                        <option value="progress">In Progress</option>
                                        <option value="queue">In Queue</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    className="btn btn-secondary"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
