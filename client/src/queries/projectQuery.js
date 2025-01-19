import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      name
      id
      status
    }
  }
`;
export const GET_PROJECT=gql`
query getProject($id:ID!){
  project(id:$id){
    name
    id
    status
    description
    client{
      id
      name
    }
  }
}

`
export { GET_PROJECTS };
