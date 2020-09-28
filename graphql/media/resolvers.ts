import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreateMediaResponse,
  IDeleteMediaResponse,
  IFindMediaByIdResponse,
  IMediaInput,
  IMedia,
} from './models';

interface IFindMediaByIdArgs {
  id: string;
}

const findMediaById = async (
  parent,
  { id }: IFindMediaByIdArgs,
  context
): Promise<IMedia> => {
  const response = await client.query<IFindMediaByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findMediaByID(id: $id) {
          _id
          name
          author
          imageUrl
          publicationDate
          partner
          partnerId
        }
      }
    `,
    variables: { id },
  });
  return response.data.findMediaByID;
};

interface ICreateMediaArgs {
  data: IMediaInput;
}

const createMedia = async (
  parent,
  { data }: ICreateMediaArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      createMedia: { _id },
    },
  } = await client.mutate<ICreateMediaResponse>({
    mutation: gql`
      mutation Mutation($data: MediaInput!) {
        createMedia(data: $data) {
          _id
        }
      }
    `,
    variables: {
      data,
    },
  });

  return { _id };
};

interface IDeleteMediaArgs {
  id: string;
}

const deleteMedia = async (
  parent,
  { id }: IDeleteMediaArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      deleteMedia: { _id },
    },
  } = await client.mutate<IDeleteMediaResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteMedia(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return { _id };
};

const mediaResolvers: IResolvers<any, any> = {
  Query: {
    findMediaById,
  },
  Mutation: {
    createMedia,
    deleteMedia,
  },
};

export { mediaResolvers };
