import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import {
  ICreateMeetingResponseResponse,
  IDeleteMeetingResponseResponse,
  IFindMeetingResponseByIdResponse,
  IMeetingResponseInput,
  IUpdateMeetingResponseResponse,
  IMeetingResponse,
} from './models';

interface IFindMeetingResponsesByNameArgs {
  name: string;
}

interface IFindMeetingResponseByIdArgs {
  id: string;
}

const findMeetingResponseById = async (
  parent,
  { id }: IFindMeetingResponseByIdArgs,
  context
): Promise<IMeetingResponse> => {
  const response = await client.query<IFindMeetingResponseByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findMeetingResponseByID(id: $id) {
          _id
          user {
            _id
            familyName
            givenName
            emailAddress
          }
          isAttending
          meeting {
            _id
            description
          }
        }
      }
    `,
    variables: { id },
  });
  return response.data.findMeetingResponseByID;
};

interface IUpdateMeetingResponseArgs {
  id: string;
  data: IMeetingResponseInput;
}

const updateMeetingResponse = async (
  parent,
  { id, data }: IUpdateMeetingResponseArgs,
  context
): Promise<IMeetingResponse> => {
  const response = await client.mutate<IUpdateMeetingResponseResponse>({
    mutation: gql`
      mutation Mutation($id: ID!, $data: MeetingResponseInput!) {
        updateMeetingResponse(id: $id, data: $data)
      }
    `,
    variables: { id, data },
  });

  return response.data.updateMeetingResponse;
};

interface ICreateMeetingResponseArgs {
  data: IMeetingResponseInput;
}

const createMeetingResponse = async (
  parent,
  { data }: ICreateMeetingResponseArgs,
  context
): Promise<IMeetingResponse> => {
  const response = await client.mutate<ICreateMeetingResponseResponse>({
    mutation: gql`
      mutation Mutation($data: MeetingResponseInput!) {
        createMeetingResponse(data: $data) {
          _id
        }
      }
    `,
    variables: {
      data: {
        ...data,
        user: {
          connect: data.user,
        },
        meeting: {
          connect: data.meeting,
        },
      },
    },
  });

  return response.data.createMeetingResponse;
};

interface IDeleteMeetingResponseArgs {
  id: string;
}

const deleteMeetingResponse = async (
  parent,
  { id }: IDeleteMeetingResponseArgs,
  context
): Promise<IMeetingResponse> => {
  const response = await client.mutate<IDeleteMeetingResponseResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteMeetingResponse(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return response.data.deleteMeetingResponse;
};

const meetingResponseResolvers: IResolvers<any, any> = {
  Query: {
    findMeetingResponseById,
  },
  Mutation: {
    updateMeetingResponse,
    createMeetingResponse,
    deleteMeetingResponse,
  },
};

export { meetingResponseResolvers };
