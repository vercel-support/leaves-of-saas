import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const linkTypeDefs: DocumentNode = gql`
  type Query {
    findLinkById(id: ID!): Link
    getLinkByUrl(url: String!): Link
  }

  type Mutation {
    createLink(data: LinkInput): CreateUpdateDelete
    deleteLink(id: ID!): CreateUpdateDelete
  }

  type Link {
    _id: String
    description: String
    image: String
    title: String
    url: String!
    type: String
    siteName: String
  }

  input LinkInput {
    "Post ID"
    post: String!
    description: String
    image: String
    title: String
    url: String!
    type: String
    siteName: String
  }
`;

export { linkTypeDefs };
