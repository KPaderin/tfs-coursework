import { basicRequest } from './basicRequest';

export const fetchAllDrafts = async (offset, count) => {
  const req = JSON.stringify({
    query: `query {
        getAllDrafts(offset:${offset}, count: ${count}) {
          _id
          postTitle
          genre
          image
          value
        }
      }`,
  });
  return await basicRequest(req).then((res) => res.data.getAllDrafts);
};
