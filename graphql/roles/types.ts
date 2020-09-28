import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const roleTypeDefs: DocumentNode = gql`
  type Query {
    findRoleById(id: ID!): Role
  }

  type Mutation {
    createRole(data: RoleInput!): CreateUpdateDelete
    deleteRole(id: ID!): CreateUpdateDelete
  }

  type Role {
    _id: ID!
    name: String!
    users: [User!]
    group: Group
  }

  input RoleInput {
    name: String!
    "Group ID"
    group: String
  }
`;

export { roleTypeDefs };
