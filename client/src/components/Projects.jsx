import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (error) {
        return <h2>Error while getting error.</h2>;
    }

    if (loading) {
        return <Spinner />;
    }

    return data.projects.length ? (
        <div className="row mt-4">
            {data.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    ) : (
        <h1>No Projects to show.</h1>
    );
}

export default Projects;
