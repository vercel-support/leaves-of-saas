import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreateRoleResponse,
  IDeleteRoleResponse,
  IFindRoleByIdResponse,
  IRoleInput,
  IRole,
} from './models';

interface IFindRoleByIdArgs {
  id: string;
}

const findRoleById = async (
  parent,
  { id }: IFindRoleByIdArgs,
  context
): Promise<IRole> => {
  const response = await client.query<IFindRoleByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findRoleByID(id: $id) {
          _id
          name
          group {
            _id
            name
            users {
              _id
              familyName
              givenName
              emailAddress
            }
          }
          title
          url
          type
          siteName
        }
      }
    `,
    variables: { id },
  });
  return response.data.findRoleByID;
};

interface ICreateRoleArgs {
  data: IRoleInput;
}

const createRole = async (
  parent,
  { data }: ICreateRoleArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      createRole: { _id },
    },
  } = await client.mutate<ICreateRoleResponse>({
    mutation: gql`
      mutation Mutation($data: RoleInput!) {
        createRole(data: $data) {
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

interface IDeleteRoleArgs {
  id: string;
}

const deleteRole = async (
  parent,
  { id }: IDeleteRoleArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      deleteRole: { _id },
    },
  } = await client.mutate<IDeleteRoleResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteRole(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return { _id };
};

const roleResolvers: IResolvers<any, any> = {
  Query: {
    findRoleById,
  },
  Mutation: {
    createRole,
    deleteRole,
  },
};

export { roleResolvers };
