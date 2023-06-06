import mongoose from 'mongoose';

const Comment = mongoose.model(
  'Comment',
  mongoose.Schema({
    value: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: { type: Date, default: Date.now(), required: true },
  })
);

const Genre = mongoose.model(
  'Genre',
  mongoose.Schema({
    genre: { type: String, unique: true, required: true },
    posts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    ],
  })
);

const Post = mongoose.model(
  'Post',
  mongoose.Schema({
    postTitle: { type: String, required: true },
    date: { type: Date, default: Date.now(), required: true },
    viewers: { type: Number, default: 0, required: true },
    genre: { type: String, ref: 'Genre', required: true },
    likes: { type: Number, default: 0, required: true },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    ],
    image: { type: String, required: false },
    value: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  })
);

const PostDraft = mongoose.model(
  'PostDraft',
  mongoose.Schema({
    postTitle: { type: String, required: true },
    genre: { type: String, ref: 'Genre' },
    image: { type: String },
    value: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isModerateRequested: { type: Boolean, default: false },
  })
);

const Role = mongoose.model(
  'Role',
  mongoose.Schema({
    value: { type: String, unique: true, required: true },
  })
);

const User = mongoose.model(
  'User',
  mongoose.Schema({
    mail: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: false },
    posts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    ],
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    ],
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    ],
    postDrafts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostDraft',
        required: true,
      },
    ],
    role: [{ type: String, ref: 'Role', required: true }],
  })
);

const mongooseModel = { Comment, Genre, Post, PostDraft, Role, User };

export default mongooseModel;
