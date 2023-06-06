import { basicRequest } from './basicRequest';

export const fetchTotalDraftsCount = (): any => {
  const req = JSON.stringify({
    query: `query {
      totalDraftsCount
    }`,
  });
  return basicRequest(req).then((res) => res.data.totalDraftsCount);
};
