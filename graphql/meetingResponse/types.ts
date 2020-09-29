import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const meetingResponseTypeDefs: DocumentNode = gql`
  type Query {
    findMeetingResponseById(id: ID!): MeetingResponse
  }

  type Mutation {
    updateMeetingResponse(
      id: ID!
      data: MeetingResponseInput!
    ): CreateUpdateDelete
    createMeetingResponse(data: MeetingResponseInput!): CreateUpdateDelete
    deleteMeetingResponse(id: ID!): CreateUpdateDelete
  }

  type MeetingResponse {
    _id: ID!
    user: User!
    isAttending: Boolean
    meeting: Meeting!
  }

  input MeetingResponseInput {
    user: ID!
    isAttending: Boolean!
    meeting: ID!
  }
`;

export { meetingResponseTypeDefs };
