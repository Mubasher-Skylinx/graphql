import React from "react";

import Clients from "../components/Clients";
import Projects from "../components/Projects";

import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";

function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddClientModal />
                <AddProjectModal />
            </div>

            <Clients />
            <hr />
            <Projects />
        </>
    );
}

export default Home;
