import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreateUserResponse,
  IDeleteUserResponse,
  IFindUserByIdResponse,
  IFindUserByEmailAddressResponse,
  IUserInput,
  IUpdateUserResponse,
  IUser,
} from './models';

interface IFindUsersByNameArgs {
  emailAddress: string;
}

const findUserByEmail = async (
  parent,
  { emailAddress }: IFindUsersByNameArgs,
  context
): Promise<IUser> => {
  const response = await client.query<IFindUserByEmailAddressResponse>({
    query: gql`
      query Query($emailAddress: String!) {
        findUserByEmail(emailAddress: $emailAddress) {
          _id
          familyName
          givenName
          emailAddress
          groups {
            name
            _id
            isInPublicDirectory
          }
          refreshTokens {
            data {
              _id
              token
              expirationDate
            }
            before
            after
          }
          roles {
            _id
            name
            group {
              name
              _id
              isInPublicDirectory
            }
          }
        }
      }
    `,
    variables: { emailAddress },
  });
  return response.data.findUserByEmail;
};

interface IFindUserByIdArgs {
  id: string;
}

const findUserById = async (
  parent,
  { id }: IFindUserByIdArgs,
  context
): Promise<IUser> => {
  const response = await client.query<IFindUserByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findUserByID(id: $id) {
          _id
          familyName
          givenName
          emailAddress
          groups {
            name
            _id
            isInPublicDirectory
          }
          refreshTokens {
            _id
            token
            expirationDate
          }
          roles {
            _id
            name
            group {
              name
              _id
              isInPublicDirectory
            }
          }
        }
      }
    `,
    variables: { id },
  });
  return response.data.findUserByID;
};

interface IUpdateUserArgs {
  id: string;
  data: IUserInput;
}

const updateUser = async (
  parent,
  { id, data }: IUpdateUserArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      updateUser: { _id },
    },
  } = await client.mutate<IUpdateUserResponse>({
    mutation: gql`
      mutation Mutation($id: ID!, $data: UserInput!) {
        updateUser(id: $id, data: $data) {
          _id
        }
      }
    `,
    variables: { id, data },
  });

  return { _id };
};

interface ICreateUserArgs {
  data: IUserInput;
}

const createUser = async (
  parent,
  { data }: ICreateUserArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      createUser: { _id },
    },
  } = await client.mutate<ICreateUserResponse>({
    mutation: gql`
      mutation Mutation($data: UserInput!) {
        createUser(data: $data) {
          _id
        }
      }
    `,
    variables: { data },
  });

  return { _id };
};

interface IDeleteUserArgs {
  id: string;
}

const deleteUser = async (
  parent,
  { id }: IDeleteUserArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      deleteUser: { _id },
    },
  } = await client.mutate<IDeleteUserResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteUser(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return { _id };
};

const userResolvers: IResolvers<any, any> = {
  Query: {
    findUserByEmail,
    findUserById,
  },
  Mutation: {
    updateUser,
    createUser,
    deleteUser,
  },
};

export { userResolvers };
