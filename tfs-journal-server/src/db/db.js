import mongoose from 'mongoose';

import mongooseModel from './mongoose-model.js';
import logger from './graphql-logger-with-db.js';

let session;

const postDraftUpdate = async (input) => {
  const { _id, postTitle, genre, image, value, isModerateRequested } = input;

  const post = await mongooseModel.PostDraft.findByIdAndUpdate(
    _id,
    { postTitle, genre, image, value, isModerateRequested },
    { session, new: true }
  );
  return post;
};

const dbFunc = {
  getUserByMail: async (mail) => {
    const user = await mongooseModel.User.findOne({ mail }).session(session);
    return user;
  },
  getUserById: async (_id) => {
    const user = await mongooseModel.User.findById(_id).session(session);
    return user;
  },
  createUser: async ({ email, name, image }) => {
    const user = await mongooseModel.User.create(
      [
        {
          mail: email,
          name,
          posts: [],
          likes: [],
          comments: [],
          postDrafts: [],
          role: 'user',
          image,
        },
      ],
      { new: true, session }
    );
    return user;
  },
  createOrUpdatePostDraft: async (input) => {
    const { _id, postTitle, genre, image, value, author, isModerateRequested } =
      input;
    if (_id) return postDraftUpdate(input);

    const post = await mongooseModel.PostDraft.create(
      [{ postTitle, genre, image, value, author, isModerateRequested }],
      { session }
    );
    await mongooseModel.User.findByIdAndUpdate(
      author,
      { $push: { postDrafts: post[0]._id } },
      { new: true }
    ).session(session);
    return post[0];
  },
  deletePostDraft: async (input) => {
    const { postId, author } = input;

    await mongooseModel.PostDraft.findByIdAndDelete(postId, {
      session,
    });
    await mongooseModel.User.findByIdAndUpdate(
      author,
      { $pull: { postDrafts: postId } },
      { new: true }
    ).session(session);
    return true;
  },
  createPostFromDraft: async (input) => {
    const { draftId, postTitle, genre, image, value } = input;
    if (!genre || !postTitle || !value)
      throw new Error('all vars not undefined');

    const { author } = await mongooseModel.PostDraft.findByIdAndDelete(
      draftId
    ).session(session);
    const post = await mongooseModel.Post.create(
      [{ postTitle, genre, image, value, author }],
      { session }
    );
    await mongooseModel.User.findByIdAndUpdate(
      author,
      { $push: { posts: post[0]._id } },
      { new: true }
    ).session(session);
    await mongooseModel.User.findByIdAndUpdate(
      author,
      { $pullAll: { postDrafts: [draftId] } },
      { new: true }
    ).session(session);
    return post[0];
  },
  updatePost: async (input) => {
    const { postId, postTitle, genre, image, value } = input;
    if (!genre || !postTitle || !value)
      throw new Error('all vars not undefined');

    const post = await mongooseModel.Post.findByIdAndUpdate(
      postId,
      { postTitle, genre, image, value },
      { session, new: true }
    );
    return post[0];
  },
  getPosts: async ({ offset, count, author }) => {
    const posts = await mongooseModel.Post.find()
      .sort({ _id: -1 })
      .skip(offset)
      .limit(count)
      .session(session);
    if (author) {
      const user = await mongooseModel.User.findById(author).session(session);
      posts.forEach((post) => {
        if (user.likes.indexOf(post._id) !== -1) {
          post.isLiked = true;
        }
      });
    }
    return posts;
  },
  getPost: async (input) => {
    const post = await mongooseModel.Post.findByIdAndUpdate(input.postId, {
      $inc: { viewers: 1 },
    }).session(session);
    if (input.author) {
      const user = await mongooseModel.User.findById(input.author).session(
        session
      );
      if (user.likes.indexOf(post._id) !== -1) {
        post.isLiked = true;
      }
    }
    return post;
  },
  addComment: async (input) => {
    const { post, author, value } = input;
    const comment = await mongooseModel.Comment.create(
      [
        {
          post,
          author,
          value,
        },
      ],
      { session, new: true }
    );
    await mongooseModel.Post.findByIdAndUpdate(post, {
      $push: { comments: comment[0]._id },
    }).session(session);
    await mongooseModel.User.findByIdAndUpdate(author, {
      $push: { comments: comment[0]._id },
    }).session(session);
    return comment[0];
  },
  like: async ({ postId, author }) => {
    const { likes } = await mongooseModel.User.findById(author).session(
      session
    );
    let isDelete = false;
    if (likes.indexOf(postId) === -1) {
      await mongooseModel.User.findByIdAndUpdate(
        author,
        { $push: { likes: postId } },
        { new: true }
      ).session(session);
    } else {
      await mongooseModel.User.findByIdAndUpdate(
        author,
        { $pull: { likes: postId } },
        { new: true }
      ).session(session);
      isDelete = true;
    }
    await mongooseModel.Post.findByIdAndUpdate(postId, {
      $inc: { likes: isDelete ? -1 : 1 },
    }).session(session);
    return !isDelete;
  },
  changeModerateStatus: async (moderate, userId) => {
    const { role } = await mongooseModel.User.findById(userId).session(session);
    if (moderate === 'admin') {
      if (role.indexOf('admin') === -1) {
        await mongooseModel.User.findByIdAndUpdate(
          userId,
          { $push: { role: 'admin' } },
          { new: true }
        ).session(session);
      }
      return moderate;
    }
    if (role.indexOf('admin') !== -1) {
      await mongooseModel.User.findByIdAndUpdate(
        userId,
        { $pull: { role: 'admin' } },
        { new: true }
      ).session(session);
    }
    return moderate;
  },
  getDrafts: async ({ offset, count, author }) => {
    const { postDrafts } = await mongooseModel.User.findById(author)
      .populate('postDrafts')
      .session(session);
    return postDrafts.slice(offset, offset + count).sort((a, b) => {
      if (a._id < b._id) return 1;
      if (a._id === b._id) return 0;
      return -1;
    });
  },
  getAllDrafts: async ({ offset, count }) => {
    const drafts = await mongooseModel.PostDraft.find({
      isModerateRequested: true,
    })
      .sort({ _id: -1 })
      .skip(offset)
      .limit(count)
      .session(session);
    return drafts || [];
  },
  getDraft: async ({ draftId }) => {
    const draft = await mongooseModel.PostDraft.findById(draftId).session(
      session
    );
    return draft;
  },
  getAllGenres: async () => {
    const genres = await mongooseModel.Genre.find().session(session);
    return genres;
  },
  totalPostsCount: async () => {
    const totalPostsCount = await mongooseModel.Post.countDocuments().session(
      session
    );
    return totalPostsCount;
  },
  totalDraftsCount: async () => {
    const totalDraftsCount = await mongooseModel.PostDraft.find({
      isModerateRequested: true,
    })
      .countDocuments()
      .session(session);
    return totalDraftsCount;
  },
  getUserPublic: async ({ userId }) => {
    const user = await mongooseModel.User.findById(userId).session(session);
    return user;
  },
  updateUserInfo: async (input) => {
    const { _id, name, image } = input;
    const upd = {};
    if (name) upd.name = name;
    if (image) upd.image = image;
    const user = await mongooseModel.User.findByIdAndUpdate(
      _id,
      { ...upd },
      { session, new: true }
    );
    return user;
  },
  withLogger: (root, needLogged) => {
    const handler = {
      get(target, prop) {
        return async (input, context) => {
          session = await mongoose.startSession();
          await session.startTransaction();
          let res;
          try {
            if (needLogged.find((item) => item === prop)) {
              await logger(prop, input, context, session);
            }
            res = await target[prop](input, context);
            await session.commitTransaction();
          } catch (e) {
            await session.abortTransaction();
            throw e;
          } finally {
            await session.endSession();
          }
          return res;
        };
      },
    };

    return new Proxy(root, handler);
  },
};

export default dbFunc;
