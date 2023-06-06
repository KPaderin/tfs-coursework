import { basicRequest } from './basicRequest';

export const deleteDraft = async (postId) => {
  const req = JSON.stringify({
    query: `mutation {
              deletePostDraft(postId:"${postId}")
            }`,
  });
  return await basicRequest(req).then((res) => res.data.deletePostDraft);
};
