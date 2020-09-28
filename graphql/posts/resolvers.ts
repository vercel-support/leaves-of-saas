import { gql } from '@apollo/client';
import client from 'graphql/client';
import {
  ICreatePostResponse,
  IDeletePostResponse,
  IFindPostByIdResponse,
  IPostInput,
  IUpdatePostResponse,
  IPost,
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
            url
            image
            description
            siteName
            title
            type
          }
          replies {
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
              direction
              user {
                _id
              }
            }
            user {
              _id
              familyName
              givenName
            }
          }
          nudges {
            direction
            user {
              _id
            }
          }
          user {
            _id
          }
        }
      }
    `,
    variables: { id },
  });
  return response.data.findPostByID;
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
        updatePost(id: $id, data: $data)
      }
    `,
    variables: { id, data },
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
): Promise<IPost> => {
  const response = await client.mutate<ICreatePostResponse>({
    mutation: gql`
      mutation Mutation($data: PostInput!) {
        createGroup(data: $data) {
          _id
        }
      }
    `,
    variables: { data },
  });

  return response.data.createPost;
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

export { updatePost, createPost, deletePost, findPostById };
