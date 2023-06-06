import { basicRequest } from './basicRequest';

export const fetchPosts = async (offset = 0, count = 20) => {
  const req = JSON.stringify({
    query: `query {
        getPosts(offset:${offset}, count: ${count}) {
          _id
          postTitle
          date
          genre
          likes
          viewers
          image
          isLiked
          comments {
            _id
          }
        }
      }`,
  });
  return await basicRequest(req).then((res) => res.data.getPosts);
};
