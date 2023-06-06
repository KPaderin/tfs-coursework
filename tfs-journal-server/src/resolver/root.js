import errorsList from '../schema/errors-list.js';
import dbFunc from '../db/db.js';
import { decodeToken } from '../helpers/decode-token.js';

const me = async (args, context) => {
  const { authorization } = context;
  const { email, name, picture } = await decodeToken(authorization);
  let user = await dbFunc.getUserByMail(email);
  if (user === null && email) {
    user = dbFunc.createUser({ email, name, image: picture });
  }
  return user;
};

const createOrUpdatePostDraft = async ({ postDraftInput }, context) => {
  const { _id } = await me(null, context);
  return dbFunc.createOrUpdatePostDraft({
    ...postDraftInput,
    author: _id,
  });
};

const deletePostDraft = async ({ postId }, context) => {
  const { _id } = await me(null, context);
  return dbFunc.deletePostDraft({ postId, author: _id });
};

const createPostFromDraft = async ({ postFromDraftInput }, context) => {
  const { role } = await me(null, context);
  if (role.indexOf('admin') === -1) return errorsList.isNotAdmin;
  return dbFunc.createPostFromDraft({ ...postFromDraftInput });
};

const updatePost = async ({ updatePostInput }, context) => {
  const { role } = await me(null, context);
  if (role.indexOf('admin') === -1) return errorsList.isNotAdmin;
  return dbFunc.updatePost({ ...updatePostInput });
};

const getPosts = async (input, context) => {
  const meRes = await me(null, context);
  return dbFunc.getPosts({ ...input, author: meRes ? meRes._id : null });
};

const getPost = async (input, context) => {
  const meRes = await me(null, context);
  return dbFunc.getPost({ ...input, author: meRes ? meRes._id : null });
};

const getDrafts = async (input, context) => {
  const { _id } = await me(null, context);
  return dbFunc.getDrafts({ ...input, author: _id });
};

const getAllDrafts = async (input, context) => {
  const { role } = await me(null, context);
  if (role.indexOf('admin') === -1) return errorsList.isNotAdmin;
  return dbFunc.getAllDrafts({ ...input });
};

const getUserDrafts = async (input, context) => {
  const { _id } = await me(null, context);
  if (!_id) return errorsList.isNotAuthorization;
  return dbFunc.getDrafts({
    offset: 0,
    count: 100000,
    author: _id,
  });
};

const getDraft = async (input, context) => {
  const { _id, role } = await me(null, context);
  const draft = await dbFunc.getDraft({ ...input });
  if (
    draft &&
    draft.author.toString() !== _id.toString() &&
    role.indexOf('admin') === -1
  ) {
    return errorsList.isNotAdmin;
  }
  return draft;
};

const getGenres = async () => dbFunc.getAllGenres();

const totalPostsCount = async () => dbFunc.totalPostsCount();

const totalDraftsCount = async () => dbFunc.totalDraftsCount();

const getUserPublic = async (input) => dbFunc.getUserPublic(input);

const updateUserInfo = async ({ updateUserInputType }, context) => {
  const { _id } = await me(null, context);
  if (!_id) return errorsList.isNotAuthorization;
  return dbFunc.updateUserInfo({ ...updateUserInputType, _id });
};

const addComment = async ({ addCommentInputType }, context) => {
  const { _id } = await me(null, context);
  if (!_id) return errorsList.isNotAuthorization;
  return dbFunc.addComment({ ...addCommentInputType, author: _id });
};

const like = async ({ postId }, context) => {
  const { _id } = await me(null, context);
  if (!_id) return errorsList.isNotAuthorization;
  return dbFunc.like({ postId, author: _id });
};

const changeModerateStatus = async ({ moderate }, context) => {
  const { _id } = await me(null, context);
  if (!_id) return errorsList.isNotAuthorization;
  return dbFunc.changeModerateStatus(moderate, _id);
};
const root = {
  me,
  createOrUpdatePostDraft,
  getPosts,
  getPost,
  createPostFromDraft,
  getDrafts,
  getAllDrafts,
  getDraft,
  getGenres,
  totalPostsCount,
  totalDraftsCount,
  getUserPublic,
  updateUserInfo,
  getUserDrafts,
  addComment,
  like,
  changeModerateStatus,
  updatePost,
  deletePostDraft,
};

export default root;
