import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLBoolean,
} from 'graphql';

import mongooseModel from '../db/mongoose-model.js';

const sortById = (arr) =>
  arr.sort((a, b) => {
    if (a._id < b._id) return 1;
    if (a._id === b._id) return 0;
    return -1;
  });

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLString) },
    post: {
      type: new GraphQLNonNull(PostType),
      resolve: async (item) => {
        const g = await mongooseModel.Post.findById(item.post);
        return g || {};
      },
    },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: async (item) => {
        const g = await mongooseModel.Comment.findById(item).populate('author');
        return g.author || {};
      },
    },
  }),
});

const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    postTitle: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    viewers: { type: new GraphQLNonNull(GraphQLInt) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    likes: { type: new GraphQLNonNull(GraphQLInt) },
    isLiked: { type: GraphQLBoolean },
    comments: {
      type: new GraphQLNonNull(new GraphQLList(CommentType)),
      resolve: async (item) => {
        const g = await mongooseModel.Post.findById(item._id).populate(
          'comments'
        );
        return sortById(g.comments) || {};
      },
    },
    image: { type: GraphQLString },
    value: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: async (item) => {
        const g = await mongooseModel.User.findById(item.author);
        return g || {};
      },
    },
  }),
});

const PostDraftType = new GraphQLObjectType({
  name: 'PostDraft',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    postTitle: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLString },
    image: { type: GraphQLString },
    value: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(UserType) },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    posts: { type: new GraphQLNonNull(new GraphQLList(PostType)) },
    likes: { type: new GraphQLNonNull(new GraphQLList(PostType)) },
    comments: { type: new GraphQLNonNull(new GraphQLList(CommentType)) },
    postDrafts: {
      type: new GraphQLNonNull(new GraphQLList(PostDraftType)),
      resolve: async (items) => {
        const g = await mongooseModel.User.findById(items).populate(
          'postDrafts'
        );
        return sortById(g.postDrafts) || [];
      },
    },
    role: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
    },
  }),
});

const UserTypePublic = new GraphQLObjectType({
  name: 'UserPublic',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: async (items) => {
        const g = await mongooseModel.User.findById(items).populate('posts');
        return sortById(g.posts) || [];
      },
    },
    likes: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: async (items) => {
        const g = await mongooseModel.User.findById(items).populate('likes');
        return sortById(g.likes) || [];
      },
    },
    comments: {
      type: new GraphQLNonNull(new GraphQLList(CommentType)),
      resolve: async (items) => {
        const g = await mongooseModel.User.findById(items).populate('comments');
        return sortById(g.comments) || [];
      },
    },
  }),
});

const PostDraftInputType = new GraphQLInputObjectType({
  name: 'PostDraftInput',
  fields: () => ({
    _id: { type: GraphQLID },
    postTitle: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLString },
    image: { type: GraphQLString },
    value: { type: new GraphQLNonNull(GraphQLString) },
    isModerateRequested: { type: GraphQLBoolean },
  }),
});

const PostFromDraftInputType = new GraphQLInputObjectType({
  name: 'PostFromDraftInput',
  fields: () => ({
    draftId: { type: new GraphQLNonNull(GraphQLString) },
    postTitle: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    value: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UpdatePostInputType = new GraphQLInputObjectType({
  name: 'UpdatePostType',
  fields: () => ({
    postId: { type: new GraphQLNonNull(GraphQLString) },
    postTitle: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    value: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UpdateUserInputType = new GraphQLInputObjectType({
  name: 'UpdateUserInputType',
  fields: () => ({
    name: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const CommentInputType = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: () => ({
    post: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const QueryRootType = new GraphQLObjectType({
  name: 'Query',
  description: 'Schema Query Root',
  fields: () => ({
    me: {
      type: UserType,
    },
    getGenres: {
      type: new GraphQLList(GenreType),
    },
    getPost: {
      args: {
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      type: PostType,
    },
    getPosts: {
      args: {
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        count: { type: new GraphQLNonNull(GraphQLInt) },
      },
      type: new GraphQLList(PostType),
    },
    getDrafts: {
      args: {
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        count: { type: new GraphQLNonNull(GraphQLInt) },
      },
      type: new GraphQLList(PostDraftType),
    },
    getAllDrafts: {
      args: {
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        count: { type: new GraphQLNonNull(GraphQLInt) },
      },
      type: new GraphQLList(PostDraftType),
    },
    getUserDrafts: {
      type: new GraphQLList(PostDraftType),
    },
    getDraft: {
      args: {
        draftId: { type: new GraphQLNonNull(GraphQLID) },
      },
      type: PostDraftType,
    },
    totalPostsCount: { type: new GraphQLNonNull(GraphQLInt) },
    totalDraftsCount: { type: new GraphQLNonNull(GraphQLInt) },
    getUserPublic: {
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      type: UserTypePublic,
    },
  }),
});

const MutationRootType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Schema Mutation Root',
  fields: () => ({
    createOrUpdatePostDraft: {
      args: {
        postDraftInput: { type: new GraphQLNonNull(PostDraftInputType) },
      },
      type: PostDraftType,
    },
    deletePostDraft: {
      args: {
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      type: GraphQLBoolean,
    },
    createPostFromDraft: {
      args: {
        postFromDraftInput: {
          type: new GraphQLNonNull(PostFromDraftInputType),
        },
      },
      type: PostType,
    },
    updatePost: {
      args: {
        updatePostInput: {
          type: new GraphQLNonNull(UpdatePostInputType),
        },
      },
      type: PostType,
    },
    updateUserInfo: {
      args: {
        updateUserInputType: {
          type: new GraphQLNonNull(UpdateUserInputType),
        },
      },
      type: UserType,
    },
    addComment: {
      args: {
        addCommentInputType: {
          type: new GraphQLNonNull(CommentInputType),
        },
      },
      type: CommentType,
    },
    like: {
      args: {
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      type: GraphQLBoolean,
    },
    changeModerateStatus: {
      args: {
        moderate: { type: GraphQLString },
      },
      type: GraphQLString,
    },
  }),
});

const schema = new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType,
});

export default schema;
