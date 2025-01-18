import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
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
//  mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientQuery,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = Client.create(args);
        return client;
      },
    },
    editClient: {
      type: ClientQuery,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = Client.findByIdAndUpdate(args.id, args);
        return client;
      },
    },
    deleteClient: {
      type: ClientQuery,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(args) {
        return Client.findByIdAndDelete(args.id);
      },
    },
    addProject: {
      type: ProjectQuery,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              inProgress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
            defaultValue: "Not Started",
          }),
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { name, description, status, clientId } = args;
        const project = Project.create({ name, description, status, clientId });
        return project;
      },
    },
    deleteProject: {
      type: ProjectQuery,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    updateProject: {
      type: ProjectQuery,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              inProgress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
            defaultValue: "Not Started",
          }),
        },
        // clientId: { type: GraphQLNonNull(GraphQLID) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { name, status, description } = args;
        return Project.findByIdAndUpdate(args.id, {
          $set: {
            name,
            status,
            // clientId,
            description,
          },
          new: true,
        });
      },
    },
  },
});
export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation,
});
