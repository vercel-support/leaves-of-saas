import { gql } from '@apollo/client';
import { IResolvers } from 'apollo-server-micro';
import client from 'graphql/client';
import { ICreateUpdateDeleteResponse } from 'graphql/models';
import {
  ICreatePostResponse,
  IDeletePostResponse,
  IPostInput,
  IUpdatePostResponse,
  IPost,
  IFindPostByIdResponse,
  faunaPostToPost,
  postInputToFaunaPostInput,
} from './models';

interface IFindPostByIdArgs {
  id: string;
}

const findPostById = async (
  parent,
  { id }: IFindPostByIdArgs,
  context
): Promise<IPost> => {
  const response = await client.query<IFindPostByIdResponse>({
    query: gql`
      query Query($id: ID!) {
        findPostByID(id: $id) {
          _id
          text
          date
          link {
            _id
            url
            image
            description
            siteName
            title
            type
          }
          group {
            _id
          }
          replies {
            data {
              reply {
                text
                date
                link {
                  url
                  image
                  description
                  siteName
                  title
                  type
                }
                nudges {
                  data {
                    direction
                    user {
                      _id
                      familyName
                      givenName
                    }
                    _id
                  }
                }
                user {
                  _id
                  familyName
                  givenName
                  emailAddress
                }
              }
            }
            after
            before
          }
          nudges {
            data {
              direction
              user {
                _id
                familyName
                givenName
              }
              _id
            }
          }
          user {
            _id
            familyName
            givenName
            emailAddress
          }
        }
      }
    `,
    variables: { id },
  });
  return faunaPostToPost(response.data.findPostByID);
};

interface IUpdatePostArgs {
  id: string;
  data: IPostInput;
}

const updatePost = async (
  parent,
  { id, data }: IUpdatePostArgs,
  context
): Promise<IPost> => {
  const response = await client.mutate<IUpdatePostResponse>({
    mutation: gql`
      mutation Mutation($id: ID!, $data: PostInput!) {
        updatePost(id: $id, data: $data) {
          _id
        }
      }
    `,
    variables: { id, data: postInputToFaunaPostInput(data) },
  });

  return response.data.updatePost;
};

interface ICreatePostArgs {
  data: IPostInput;
}

const createPost = async (
  parent,
  { data }: ICreatePostArgs,
  context
): Promise<ICreateUpdateDeleteResponse> => {
  const response = await client.mutate<ICreatePostResponse>({
    mutation: gql`
      mutation Mutation($data: PostInput!) {
        createPost(data: $data) {
          _id
        }
      }
    `,
    variables: { data: postInputToFaunaPostInput(data) },
  });

  return response.data.createPost as ICreateUpdateDeleteResponse;
};

interface IDeletePostArgs {
  id: string;
}

const deletePost = async (
  parent,
  { id }: IDeletePostArgs,
  context
): Promise<IPost> => {
  const response = await client.mutate<IDeletePostResponse>({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deletePost(id: $id) {
          _id
        }
      }
    `,
    variables: { id },
  });

  return response.data.deletePost;
};

const postResolvers: IResolvers<any, any> = {
  Query: {
    findPostById,
  },
  Mutation: {
    deletePost,
    updatePost,
    createPost,
  },
};

export { postResolvers };
