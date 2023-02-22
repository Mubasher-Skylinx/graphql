import { gql } from "@apollo/client";

export const ADD_PROJECT = gql`
    mutation addProject(
        $name: String!
        $clientId: ID!
        $description: String!
        $status: ProjectStatus!
    ) {
        addProject(name: $name, clientId: $clientId, description: $description, status: $status) {
            id
            name
            description
            status
            client {
                name
                email
                phone
            }
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation updateProject(
        $id: ID!
        $name: String!
        $description: String!
        $status: UpdateProjectStatus!
    ) {
        updateProject(id: $id, name: $name, description: $description, status: $status) {
            id
            name
            description
            status
            client {
                name
                email
                phone
            }
        }
    }
`;

export const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`;
