import { basicRequest } from './basicRequest';

export const fetchGenres = async () => {
  const req = JSON.stringify({
    query: `query {
              getGenres {
                _id
                genre
              }
            }`,
  });
  return await basicRequest(req).then((res) => res.data.getGenres);
};
