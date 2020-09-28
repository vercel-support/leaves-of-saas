import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const groupTypeDefs: DocumentNode = gql`
  type Query {
    getAllGroups: GroupPagedResponse
    findGroupsByName(name: String!): GroupPagedResponse
    findGroupsById(id: ID!): Group
  }

  type Mutation {
    updateGroup(id: ID!, data: GroupInput!): CreateUpdateDelete
    createGroup(data: GroupInput!): CreateUpdateDelete
    deleteGroup(id: ID!): CreateUpdateDelete
  }

  # Group

  type Group {
    _id: ID!
    name: String!
    isInPublicDirectory: Boolean!
  }

  input GroupInput {
    name: String!
    isInPublicDirectory: Boolean!
  }

  type GroupPagedResponse {
    data: [Group!]
    before: String
    after: String
  }
`;

export { groupTypeDefs };
