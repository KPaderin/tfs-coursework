import { basicRequest } from './basicRequest';

export const like = (postId): any => {
  const req = JSON.stringify({
    query: `mutation {
              like(postId: "${postId}")
            }`,
  });
  return basicRequest(req).then((res) => res.data);
};
