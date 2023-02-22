import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const statusValues = {
    pending: "new",
    progress: "progress",
    queue: "queue",
    Completed: "completed",
};

export default function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(statusValues[project.status]);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        // refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id } }],

        update(cache, { data: { updateProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: projects.map((innerProject) =>
                        innerProject.id === updateProject.id ? updateProject : innerProject
                    ),
                },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        }

        updateProject(project.id, name, description, status);

        setName("");
        setDescription("");
        setStatus("new");
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#updateProjectModal"
            >
                <div className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>Update Project</div>
                </div>
            </button>

            <div
                className="modal fade"
                id="updateProjectModal"
                aria-labelledby="updateProjectModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateProjectModalLabel">
                                Update Project
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
