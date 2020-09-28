import { updatePost, createPost, deletePost, findPostById } from './resolvers';
import { IPostResponse, IPost } from './models';

export { updatePost, createPost, deletePost, findPostById };
export type { IPost, IPostResponse };
