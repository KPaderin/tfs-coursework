import { imageUploadURL, tfsAuthorization } from '../configs/config';

export const uploadImage = async (image: any) => {
  const token = localStorage.getItem(tfsAuthorization);
  let headerData = {};
  if (token && !('Authorization' in headerData)) {
    headerData = { ...headerData, Authorization: token };
  }

  const data = new FormData();
  data.append('image', image);

  return await fetch(imageUploadURL, {
    method: 'POST',
    headers: headerData,
    body: data,
  })
    .then(async (res) => await res.json())
    .catch((e) => {
      alert(e);
    });
};
