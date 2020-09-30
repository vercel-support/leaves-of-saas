import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const nudgeTypeDefs: DocumentNode = gql`
  enum NudgeDirection {
    UP
    DOWN
  }

  type Mutation {
    createNudge(data: NudgeInput!): CreateUpdateDelete
    deleteNudge(id: ID!): CreateUpdateDelete
    updateNudge(id: ID!, data: NudgeInput!): CreateUpdateDelete
  }

  type Nudge {
    _id: ID!
    user: ID!
    direction: NudgeDirection!
    post: ID!
  }

  input NudgeInput {
    user: ID!
    direction: NudgeDirection!
    post: ID!
  }
`;

export { nudgeTypeDefs };
