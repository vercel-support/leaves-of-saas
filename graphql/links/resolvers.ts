import { gql } from '@apollo/client';
import client from 'graphql/client';
import ogs from 'open-graph-scraper';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreateLinkResponse,
  IDeleteLinkResponse,
  IFindLinkByIdResponse,
  ILinkInput,
  ILink,
  ILinkQueryResult,
} from './models';
import { IResolvers } from 'apollo-server-micro';

interface IFindLinkByIdArgs {
  id: string;
}

const findLinkById = async (
  parent,
  { id }: IFindLinkByIdArgs,
  context
): Promise<ILink> => {
  const response = await client.query<IFindLinkByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findLinkByID(id: $id) {
          _id
          description
          image
          title
          url
          type
          siteName
        }
      }
    `,
    variables: { id },
  });
  return response.data.findLinkByID;
};

interface ICreateLinkArgs {
  data: ILinkInput;
}

const createLink = async (
  parent,
  { data }: ICreateLinkArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      createLink: { _id },
    },
  } = await client.mutate<ICreateLinkResponse>({
    mutation: gql`
      mutation Mutation($data: LinkInput!) {
        createLink(data: $data) {
          _id
        }
      }
    `,
    variables: { data },
  });

  return { _id };
};

interface IDeleteLinkArgs {
  id: string;
}

const deleteLink = async (
  parent,
  { id }: IDeleteLinkArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const {
    data: {
      deleteLink: { _id },
    },
  } = await client.mutate<IDeleteLinkResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteLink(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return { _id };
};

interface IGetLinkArgs {
  url: string;
}

const getLinkByUrl = async (
  parent,
  { url }: IGetLinkArgs,
  context
): Promise<ILinkQueryResult> => {
  const { error, result } = await ogs({ url });
  return {
    url: result.ogUrl,
    description: result.ogDescription,
    title: result.ogTitle,
    siteName: result.ogSiteName,
    type: result.ogType,
    image: result.ogImage?.url,
  };
};

const linkResolvers: IResolvers<any, any> = {
  Query: {
    findLinkById,
    getLinkByUrl,
  },
  Mutation: {
    createLink,
    deleteLink,
  },
};

export { linkResolvers };
