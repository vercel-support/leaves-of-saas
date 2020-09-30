import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreateMeetingResponse,
  IDeleteMeetingResponse,
  IFindMeetingByIdResponse,
  IMeetingInput,
  IMeeting,
} from './models';

interface IFindMeetingByIdArgs {
  id: string;
}

const findMeetingById = async (
  parent,
  { id }: IFindMeetingByIdArgs,
  context
): Promise<IMeeting> => {
  const response = await client.query<IFindMeetingByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findMeetingByID(id: $id) {
          _id
          addressLine1
          addressLine2
          city
          state
          startDateTime
          endDateTime
          description
          group {
            _id
            isInPublicDirectory
            name
          }
          attendance {
            data {
              _id
              isAttending
              user {
                _id
                familyName
                givenName
                emailAddress
              }
            }
          }
        }
      }
    `,
    variables: { id },
  });
  return response.data.findMeetingByID;
};

interface ICreateMeetingArgs {
  data: IMeetingInput;
}

const createMeeting = async (
  parent,
  { data }: ICreateMeetingArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      createMeeting: { _id },
    },
  } = await client.mutate<ICreateMeetingResponse>({
    mutation: gql`
      mutation Mutation($data: MeetingInput!) {
        createMeeting(data: $data) {
          _id
        }
      }
    `,
    variables: {
      data: {
        ...data,
        group: {
          connect: data.group,
        },
      },
    },
  });
  return { _id };
};

interface IUpdateMeetingArgs {
  id: string;
  data: IMeetingInput;
}

export interface IUpdateMeetingResponse {
  updateMeeting: IMeeting;
}

const updateMeeting = async (
  parent,
  { id, data }: IUpdateMeetingArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      updateMeeting: { _id },
    },
  } = await client.mutate<IUpdateMeetingResponse>({
    mutation: gql`
      mutation Mutation($id: ID!, $data: MeetingInput!) {
        updateMeeting(id: $id, data: $data) {
          _id
        }
      }
    `,
    variables: {
      data: {
        ...data,
        group: {
          connect: data.group,
        },
      },
      id,
    },
  });
  return { _id };
};

interface IDeleteMeetingArgs {
  id: string;
}

const deleteMeeting = async (
  parent,
  { id }: IDeleteMeetingArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      deleteMeeting: { _id },
    },
  } = await client.mutate<IDeleteMeetingResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteMeeting(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return { _id };
};

const meetingResolvers: IResolvers<any, any> = {
  Query: {
    findMeetingById,
  },
  Mutation: {
    createMeeting,
    deleteMeeting,
    updateMeeting,
  },
};

export { meetingResolvers };
