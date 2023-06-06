import { basicRequest } from './basicRequest';

export const sendComment = (postId, value): any => {
  const req = JSON.stringify({
    query: `mutation {
              addComment(addCommentInputType: {
                post:"${postId}"
                value: "${value}"
              }){
                _id
                value
                date
                post {
                  _id
                }
                author {
                  _id
                  image
                  name
                }
              }
            }`,
  });
  return basicRequest(req).then((res) => res.data.addComment);
};
