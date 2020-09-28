import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const goodReadsTypeDefs: DocumentNode = gql`
  type Query {
    findGoodReads(
      search: String!
      skip: Int = 0
      take: Int = 20
    ): GoodReadResponse
  }

  type GoodReadResponse {
    items: [GoodRead!]
    hasMore: Boolean!
  }

  type GoodRead {
    id: Int
    title: String
    author: String
    imageUrl: String
    averageRating: Float
    publicationDate: String
  }
`;

export { goodReadsTypeDefs };
