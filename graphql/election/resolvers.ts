import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreateElectionResponse,
  IDeleteElectionResponse,
  IFindElectionByIdResponse,
  IElectionInput,
  IElection,
  IUpdateElectionResponse,
} from './models';

interface IFindElectionByIdArgs {
  id: string;
}

const findElectionById = async (
  parent,
  { id }: IFindElectionByIdArgs,
  context
): Promise<IElection> => {
  const response = await client.query<IFindElectionByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findElectionByID(id: $id) {
          _id
          startDateTime
          endDateTime
          group {
            _id
            isInPublicDirectory
            name
          }
          nominations {
            _id
            votes {
              _id
              value
              user {
                _id
              }
            }
            pitchedBy {
              _id
              familyName
              givenName
              emailAddress
            }
            reading {
              votes {
                _id
                value
                user {
                  _id
                }
              }
              position
            }
            date
            group {
              _id
              name
              isInPublicDirectory
            }
          }
        }
      }
    `,
    variables: { id },
  });
  return response.data.findElectionByID;
};

interface ICreateElectionArgs {
  data: IElectionInput;
}

const createElection = async (
  parent,
  { data }: ICreateElectionArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      createElection: { _id },
    },
  } = await client.mutate<ICreateElectionResponse>({
    mutation: gql`
      mutation Mutation($data: ElectionInput!) {
        createElection(data: $data) {
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

interface IUpdateElectionArgs {
  id: string;
  data: IElectionInput;
}

const updateElection = async (
  parent,
  { id, data }: IUpdateElectionArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      updateElection: { _id },
    },
  } = await client.mutate<IUpdateElectionResponse>({
    mutation: gql`
      mutation Mutation($id: ID!, $data: ElectionInput!) {
        updateElection(id: $id, data: $data) {
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

interface IDeleteElectionArgs {
  id: string;
}

const deleteElection = async (
  parent,
  { id }: IDeleteElectionArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      deleteElection: { _id },
    },
  } = await client.mutate<IDeleteElectionResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteElection(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return { _id };
};

const electionResolvers: IResolvers<any, any> = {
  Query: {
    findElectionById,
  },
  Mutation: {
    createElection,
    deleteElection,
    updateElection,
  },
};

export { electionResolvers };
