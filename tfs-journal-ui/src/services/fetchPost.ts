import { basicRequest } from './basicRequest';

export const fetchPost = async (postId) => {
  const req = JSON.stringify({
    query: `query {
        getPost(postId:"${postId}") {
          _id
          postTitle
          date
          genre
          likes
          viewers
          value
          image
          isLiked
          author {
            _id
            name
            image
          }
          comments {
            _id
            value
            date
            author {
              _id
              image
              name
            }
          }
        }
      }`,
  });
  return await basicRequest(req).then((res) => res.data.getPost);
};
