import { basicRequest } from './basicRequest';

export const fetchTotalPostsCount = (): any => {
  const req = JSON.stringify({
    query: `query {
      totalPostsCount
    }`,
  });
  return basicRequest(req).then((res) => res.data.totalPostsCount);
};
