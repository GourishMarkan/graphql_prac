import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $status: String!
    $description: String!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      status: $status
      description: $description
      clientId: $clientId
    ) {
      id
      name
      status
      description
      client {
        id
        name
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      name
      id
      status
      description
      client {
        id
        name
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $status: String!
    $description: String!
    $clientId: ID!
  ) {
    updateProject(
      id: $id
      name: $name
      status: $status
      description: $description
      clientId: $clientId
    ) {
      id
      name
      status
      description
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT };
