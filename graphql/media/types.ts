import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const mediaTypeDefs: DocumentNode = gql`
  scalar Date

  enum Partner {
    GOODREADS
  }

  type Query {
    findMediaById(id: ID!): Media
  }

  type Mutation {
    createMedia(data: MediaInput!): CreateUpdateDelete
    deleteMedia(id: ID!): CreateUpdateDelete
  }

  type Media {
    _id: ID!
    name: String!
    author: String!
    imageUrl: String!
    publicationDate: Date
    partner: Partner
    partnerId: String
  }

  input MediaInput {
    name: String!
    author: String!
    imageUrl: String!
    publicationDate: Date
    partner: Partner
    partnerId: String
  }
`;

export { mediaTypeDefs };
