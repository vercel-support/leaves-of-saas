import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const postTypeDefs: DocumentNode = gql`
  type Query {
    findPostById(id: ID!): Post
  }

  type Mutation {
    createPost(data: PostInput!): CreateUpdateDelete
    updatePost(id: ID!, data: PostInput!): CreateUpdateDelete
    deletePost(id: ID!): CreateUpdateDelete
  }

  type Post {
    _id: ID!
    nudges: [Nudge!]
    user: User!
    text: String!
    date: Time!
    inReplyTo: Post
    replies: [Post!]
    reading: ID
    group: ID!
    link: Link
  }

  input PostInput {
    user: ID!
    text: String!
    date: Time!
    reading: ID
    group: ID!
    link: LinkInput
    replyTo: ID
  }
`;

export { postTypeDefs };
