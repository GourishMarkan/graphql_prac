import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
// import { clients, projects } from "../sampleData.js";
import { Client } from "../models/client.model.js";
import { Project } from "../models/project.model.js";

// Define the Query
const ClientQuery = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectQuery = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientQuery,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

export const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientQuery),
      resolve() {
        return Client.find();
      },
    },
    client: {
      type: ClientQuery,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectQuery),
      resolve() {
        return Project.find();
      },
    },
    project: {
      type: ProjectQuery,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: rootQuery,
});
