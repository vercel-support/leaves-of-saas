import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreateNudgeResponse,
  IDeleteNudgeResponse,
  INudgeInput,
  IUpdateNudgeResponse,
} from './models';

interface ICreateNudgeArgs {
  data: INudgeInput;
}

const createNudge = async (
  parent,
  { data }: ICreateNudgeArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      createNudge: { _id },
    },
  } = await client.mutate<ICreateNudgeResponse>({
    mutation: gql`
      mutation Mutation($data: NudgeInput!) {
        createNudge(data: $data) {
          _id
        }
      }
    `,
    variables: {
      data: {
        ...data,
        post: {
          connect: data.post,
        },
        user: {
          connect: data.user,
        },
      },
    },
  });
  return { _id };
};

interface IUpdateNudgeArgs {
  id: string;
  data: INudgeInput;
}

const updateNudge = async (
  parent,
  { id, data }: IUpdateNudgeArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      updateNudge: { _id },
    },
  } = await client.mutate<IUpdateNudgeResponse>({
    mutation: gql`
      mutation Mutation($id: ID!, $data: NudgeInput!) {
        updateNudge(id: $id, data: $data) {
          _id
        }
      }
    `,
    variables: {
      data: {
        ...data,
        post: {
          connect: data.post,
        },
        user: {
          connect: data.user,
        },
      },
      id,
    },
  });
  return { _id };
};

interface IDeleteNudgeArgs {
  id: string;
}

const deleteNudge = async (
  parent,
  { id }: IDeleteNudgeArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      deleteNudge: { _id },
    },
  } = await client.mutate<IDeleteNudgeResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteNudge(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return { _id };
};

const nudgeResolvers: IResolvers<any, any> = {
  Mutation: {
    createNudge,
    deleteNudge,
    updateNudge,
  },
};

export { nudgeResolvers };
