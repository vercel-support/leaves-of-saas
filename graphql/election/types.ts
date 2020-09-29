import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const electionTypeDefs: DocumentNode = gql`
  type Query {
    findElectionById(id: ID!): Election
  }

  type Mutation {
    createElection(data: ElectionInput!): CreateUpdateDelete
    deleteElection(id: ID!): CreateUpdateDelete
  }

  type Election {
    _id: ID!
    startDateTime: Time!
    endDateTime: Time!
    group: Group!
    nominations: [Nomination!]
  }

  input ElectionInput {
    startDateTime: Time!
    endDateTime: Time!
    group: ID!
  }
`;

export { electionTypeDefs };
