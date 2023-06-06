import { basicRequest } from './basicRequest';

export const updateUser = (name, image): any => {
  const nameReq = name ? `name: "${name}"` : '';
  const imageReq = image ? `image: "${image}"` : '';

  const req = JSON.stringify({
    query: `mutation {
        updateUserInfo(updateUserInputType: {
          ${nameReq}
          ${imageReq}
        }) {
          name
          image
        }
      }`,
  });
  return basicRequest(req).then((res) => res.data.updateUserInfo);
};
