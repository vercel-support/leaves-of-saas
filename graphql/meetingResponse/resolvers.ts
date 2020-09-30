import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreateMeetingResponseResponse,
  IDeleteMeetingResponseResponse,
  IFindMeetingResponseByIdResponse,
  IMeetingResponseInput,
  IUpdateMeetingResponseResponse,
  IMeetingResponse,
} from './models';

interface IFindMeetingResponseByIdArgs {
  id: string;
}

const findMeetingResponseById = async (
  parent,
  { id }: IFindMeetingResponseByIdArgs,
  context
): Promise<IMeetingResponse> => {
  const {
    data: { findMeetingResponseByID: result },
  } = await client.query<IFindMeetingResponseByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findMeetingResponseByID(id: $id) {
          _id
          user {
            _id
          }
          isAttending
          meeting {
            _id
          }
        }
      }
    `,
    variables: { id },
  });
  return {
    _id: result._id,
    isAttending: result.isAttending,
    user: result.user._id,
    meeting: result.user._id,
  };
};

interface IUpdateMeetingResponseArgs {
  id: string;
  data: IMeetingResponseInput;
}

const updateMeetingResponse = async (
  parent,
  { id, data }: IUpdateMeetingResponseArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: { updateMeetingResponse },
  } = await client.mutate<IUpdateMeetingResponseResponse>({
    mutation: gql`
      mutation Mutation($id: ID!, $data: MeetingResponseInput!) {
        updateMeetingResponse(id: $id, data: $data) {
          _id
        }
      }
    `,
    variables: { id, data },
  });

  return updateMeetingResponse as ICreateUpdateDeleteResponse;
};

interface ICreateMeetingResponseArgs {
  data: IMeetingResponseInput;
}

const createMeetingResponse = async (
  parent,
  { data }: ICreateMeetingResponseArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
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

  return response.data.createMeetingResponse as ICreateUpdateDeleteResponse;
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
