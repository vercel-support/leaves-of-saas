import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const userTypeDefs: DocumentNode = gql`
  type Query {
    findUserByEmail(emailAddress: String!): User
    findUserById(id: ID!): User
  }

  type Mutation {
    updateUser(id: ID!, data: UserInput!): CreateUpdateDelete
    createUser(data: UserInput!): CreateUpdateDelete
    deleteUser(id: ID!): CreateUpdateDelete
  }

  input UserInput {
    givenName: String!
    familyName: String!
    emailAddress: String!
    posts: [ID!]
    groups: [ID!]
    nominations: [ID!]
    nudges: [ID!]
    refreshTokens: [ID!]
    roles: [ID!]
  }

  type User {
    _id: ID!
    givenName: String!
    familyName: String!
    emailAddress: String!
    posts: [Post!]
    groups: [Group!]
    nominations: [Nomination!]
    nudges: [Nudge!]
    refreshTokens: RefreshTokenPagedResponse
    roles: [Role!]
  }
`;

export { userTypeDefs };
