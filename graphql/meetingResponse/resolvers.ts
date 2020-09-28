import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import {
  ICreateMeetingResponseResponse,
  IDeleteMeetingResponseResponse,
  IFaunaMeetingResponsePagedResponse,
  IFindMeetingResponseByIdResponse,
  IFindMeetingResponsesByNamePagedResponse,
  IMeetingResponseInput,
  IMeetingResponseResponse,
  IUpdateMeetingResponseResponse,
  IMeetingResponse,
} from './models';

const getAllMeetingResponses = async (
  parent,
  args,
  context
): Promise<IMeetingResponseResponse> => {
  const response = await client.query<IFaunaMeetingResponsePagedResponse>({
    query: gql`
      query {
        meetingresponses {
          data {
            _id
            name
            isInPublicDirectory
          }
        }
      }
    `,
  });
  console.log(response.data);

  return response.data.meetingresponses;
};

interface IFindMeetingResponsesByNameArgs {
  name: string;
}

const findMeetingResponsesByName = async (
  parent,
  { name }: IFindMeetingResponsesByNameArgs,
  context
): Promise<IMeetingResponseResponse> => {
  const response = await client.query<IFindMeetingResponsesByNamePagedResponse>(
    {
      query: gql`
        query Query($name: String!, $isInPublicDirectory: Boolean!) {
          findMeetingResponseByName(
            name: $name
            isInPublicDirectory: $isInPublicDirectory
          ) {
            data {
              _id
              name
              isInPublicDirectory
            }
            before
            after
          }
        }
      `,
      variables: { isInPublicDirectory: true, name },
    }
  );

  return response.data.findMeetingResponseByName;
};

interface IFindMeetingResponseByIdArgs {
  id: string;
}

const findMeetingResponsesById = async (
  parent,
  { id }: IFindMeetingResponseByIdArgs,
  context
): Promise<IMeetingResponse> => {
  const response = await client.query<IFindMeetingResponseByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findMeetingResponseByID(id: $id) {
          _id
          name
          isInPublicDirectory
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
    variables: { data },
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

const meetingresponseResolvers: IResolvers<any, any> = {
  Query: {
    findMeetingResponsesByName,
    findMeetingResponsesById,
    getAllMeetingResponses,
  },
  Mutation: {
    updateMeetingResponse,
    createMeetingResponse,
    deleteMeetingResponse,
  },
};

export { meetingresponseResolvers };
