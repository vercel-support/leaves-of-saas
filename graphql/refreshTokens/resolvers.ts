import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import dayjs from 'dayjs';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import { generate } from 'rand-token';
import {
  ICreateRefreshTokenResponse,
  IDeleteRefreshTokenResponse,
  IFindRefreshTokenByIdResponse,
  IRefreshTokenInput,
  IRefreshToken,
} from './models';

interface IFindRefreshTokenByIdArgs {
  id: string;
}

const findRefreshTokenById = async (
  parent,
  { id }: IFindRefreshTokenByIdArgs,
  context
): Promise<IRefreshToken> => {
  const response = await client.query<IFindRefreshTokenByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findRefreshTokenByID(id: $id) {
          _id
          expirationDate
          token
        }
      }
    `,
    variables: { id },
  });
  return response.data.findRefreshTokenByID;
};

interface ICreateRefreshTokenArgs {
  data: IRefreshTokenInput;
}

const createRefreshToken = async (
  parent,
  args: ICreateRefreshTokenArgs,
  context
): Promise<IRefreshToken> => {
  const expirationDate = dayjs()
    .add(+process.env.JWT_TIMEOUT_MINUTES, 'minute')
    .toISOString();
  // .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const token = generate(36);

  console.log(expirationDate, process.env.JWT_TIMEOUT_MINUTES);

  const { data } = await client.mutate<ICreateRefreshTokenResponse>({
    mutation: gql`
      mutation Mutation($data: RefreshTokenInput!) {
        createRefreshToken(data: $data) {
          _id
          token
          expirationDate
        }
      }
    `,
    variables: {
      data: {
        token,
        expirationDate,
        user: {
          connect: args.data.user,
        },
      },
    },
  });

  return data.createRefreshToken;
};

interface IDeleteRefreshTokenArgs {
  id: string;
}

const deleteRefreshToken = async (
  parent,
  { id }: IDeleteRefreshTokenArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      deleteRefreshToken: { _id },
    },
  } = await client.mutate<IDeleteRefreshTokenResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteRefreshToken(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return { _id };
};

const refreshTokenResolvers: IResolvers<any, any> = {
  Query: {
    findRefreshTokenById,
  },
  Mutation: {
    createRefreshToken,
    deleteRefreshToken,
  },
};

export { refreshTokenResolvers };
