import { basicRequest } from './basicRequest';

export const setModerateStatus = (role): any => {
  const req = JSON.stringify({
    query: `mutation {
      changeModerateStatus(moderate:"${role}")
    }`,
  });
  return basicRequest(req).then((res) => res.data.changeModerateStatus);
};
