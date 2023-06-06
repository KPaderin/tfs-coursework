import { basicRequest } from './basicRequest';

export const fetchMe = (): any => {
  const req = JSON.stringify({
    query: `query me {
        me {
          _id
          name
          role
          image
        }
      }`,
  });
  return basicRequest(req).then((res) => res.data.me);
};
