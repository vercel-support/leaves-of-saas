import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const refreshTokenTypeDefs: DocumentNode = gql`
  type Query {
    findRefreshTokenById(id: ID!): RefreshToken
  }

  type Mutation {
    createRefreshToken(data: RefreshTokenInput): RefreshToken
    deleteRefreshToken(id: ID!): CreateUpdateDelete
  }

  type RefreshToken {
    _id: ID!
    token: String
    expirationDate: Time
  }

  type RefreshTokenPagedResponse {
    data: [RefreshToken!]
    before: String
    after: String
  }

  input RefreshTokenInput {
    user: ID!
  }
`;

export { refreshTokenTypeDefs };
