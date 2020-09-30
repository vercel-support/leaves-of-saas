import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { goodReadsResolvers, goodReadsTypeDefs } from 'graphql/goodReads';
import { groupTypeDefs, groupResolvers } from 'graphql/groups';
import { userTypeDefs, userResolvers } from 'graphql/users';
import { linkTypeDefs, linkResolvers } from 'graphql/links';
import { roleResolvers, roleTypeDefs } from 'graphql/roles';
import {
  refreshTokenResolvers,
  refreshTokenTypeDefs,
} from 'graphql/refreshTokens';
import { mediaResolvers, mediaTypeDefs } from 'graphql/media';
import { meetingResolvers, meetingTypeDefs } from 'graphql/meeting';
import {
  meetingResponseResolvers,
  meetingResponseTypeDefs,
} from 'graphql/meetingResponse';
import { electionResolvers, electionTypeDefs } from 'graphql/election';
import { postResolvers, postTypeDefs } from 'graphql/posts';
import { nudgeResolvers, nudgeTypeDefs } from 'graphql/nudge';

const commonTypeDefs: DocumentNode = gql`
  scalar Time
  scalar Date

  type CreateUpdateDelete {
    _id: ID!
  }

  type Nomination {
    _id: ID!
  }

  type Nudge {
    _id: ID!
  }

  type Post {
    _id: ID!
  }
`;

const typeDefs = mergeTypeDefs([
  groupTypeDefs,
  commonTypeDefs,
  linkTypeDefs,
  roleTypeDefs,
  userTypeDefs,
  refreshTokenTypeDefs,
  goodReadsTypeDefs,
  mediaTypeDefs,
  meetingTypeDefs,
  meetingResponseTypeDefs,
  electionTypeDefs,
  postTypeDefs,
  nudgeTypeDefs,
]);
const resolvers = mergeResolvers([
  groupResolvers,
  goodReadsResolvers,
  linkResolvers,
  roleResolvers,
  userResolvers,
  refreshTokenResolvers,
  mediaResolvers,
  meetingResolvers,
  meetingResponseResolvers,
  electionResolvers,
  postResolvers,
  nudgeResolvers,
]);

export { typeDefs, resolvers };
