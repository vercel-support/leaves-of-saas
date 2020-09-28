import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import {
  ICreateGroupResponse,
  IDeleteGroupResponse,
  IFaunaGroupPagedResponse,
  IFindGroupByIdResponse,
  IFindGroupsByNamePagedResponse,
  IGroupInput,
  IGroupResponse,
  IUpdateGroupResponse,
  IGroup,
} from './models';

const getAllGroups = async (parent, args, context): Promise<IGroupResponse> => {
  const response = await client.query<IFaunaGroupPagedResponse>({
    query: gql`
      query {
        groups {
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

  return response.data.groups;
};

interface IFindGroupsByNameArgs {
  name: string;
}

const findGroupsByName = async (
  parent,
  { name }: IFindGroupsByNameArgs,
  context
): Promise<IGroupResponse> => {
  const response = await client.query<IFindGroupsByNamePagedResponse>({
    query: gql`
      query Query($name: String!, $isInPublicDirectory: Boolean!) {
        findGroupByName(
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
  });

  return response.data.findGroupByName;
};

interface IFindGroupByIdArgs {
  id: string;
}

const findGroupsById = async (
  parent,
  { id }: IFindGroupByIdArgs,
  context
): Promise<IGroup> => {
  const response = await client.query<IFindGroupByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findGroupByID(id: $id) {
          _id
          name
          isInPublicDirectory
        }
      }
    `,
    variables: { id },
  });
  return response.data.findGroupByID;
};

interface IUpdateGroupArgs {
  id: string;
  data: IGroupInput;
}

const updateGroup = async (
  parent,
  { id, data }: IUpdateGroupArgs,
  context
): Promise<IGroup> => {
  const response = await client.mutate<IUpdateGroupResponse>({
    mutation: gql`
      mutation Mutation($id: ID!, $data: GroupInput!) {
        updateGroup(id: $id, data: $data)
      }
    `,
    variables: { id, data },
  });

  return response.data.updateGroup;
};

interface ICreateGroupArgs {
  data: IGroupInput;
}

const createGroup = async (
  parent,
  { data }: ICreateGroupArgs,
  context
): Promise<IGroup> => {
  const response = await client.mutate<ICreateGroupResponse>({
    mutation: gql`
      mutation Mutation($data: GroupInput!) {
        createGroup(data: $data) {
          _id
        }
      }
    `,
    variables: { data },
  });

  return response.data.createGroup;
};

interface IDeleteGroupArgs {
  id: string;
}

const deleteGroup = async (
  parent,
  { id }: IDeleteGroupArgs,
  context
): Promise<IGroup> => {
  const response = await client.mutate<IDeleteGroupResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteGroup(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return response.data.deleteGroup;
};

const groupResolvers: IResolvers<any, any> = {
  Query: {
    findGroupsByName,
    findGroupsById,
    getAllGroups,
  },
  Mutation: {
    updateGroup,
    createGroup,
    deleteGroup,
  },
};

export { groupResolvers };
