import { gql } from 'apollo-server-micro';
import { DocumentNode } from 'graphql';

const meetingTypeDefs: DocumentNode = gql`
  type Query {
    findMeetingById(id: ID!): Meeting
  }

  type Mutation {
    createMeeting(data: MeetingInput!): CreateUpdateDelete
    updateMeeting(id: ID!, data: MeetingInput!): CreateUpdateDelete
    deleteMeeting(id: ID!): CreateUpdateDelete
  }

  type Meeting {
    _id: ID!
    startDateTime: Time!
    endDateTime: Time!
    description: String!
    addressLine1: String
    addressLine2: String
    city: String
    state: String
    group: Group!
    attendance: MeetingResponsePage
  }

  input MeetingInput {
    startDateTime: Time!
    endDateTime: Time!
    description: String!
    addressLine1: String
    addressLine2: String
    city: String
    state: String
    group: ID!
  }

  type MeetingResponsePage {
    data: [MeetingResponse!]
    after: String
    before: String
  }
`;

export { meetingTypeDefs };
