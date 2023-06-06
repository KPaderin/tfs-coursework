import { basicRequest } from './basicRequest';

export const fetchUserDrafts = async () => {
  const req = JSON.stringify({
    query: `query {
        getUserDrafts {
          _id
          postTitle
          genre
          image
          value
        }
      }`,
  });
  return await basicRequest(req).then((res) => res.data.getUserDrafts);
};
