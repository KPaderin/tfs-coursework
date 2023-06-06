import { basicRequest } from './basicRequest';

export const fetchUser = (userId): any => {
  const req = JSON.stringify({
    query: `query { getUserPublic(userId:"${userId}") {
        _id
        name
        image
        posts {
          _id
          postTitle
        }
        likes {
          _id
          postTitle
        }
        comments {
          _id
          value
          date
          post {
            _id
            postTitle
          }
        }
      }
    }`,
  });
  return basicRequest(req).then((res) => res.data.getUserPublic);
};
