import { apiRequestURL, tfsAuthorization } from '../configs/config';

export const basicRequest = async (data: any) => {
  const token = localStorage.getItem(tfsAuthorization);
  let headerData: any = {
    'Content-Type': 'application/json',
  };
  if (token && !('Authorization' in headerData)) {
    headerData = { ...headerData, Authorization: token };
  }

  return await fetch(apiRequestURL, {
    method: 'POST',
    headers: headerData,
    body: data,
  }).then(async (res) => await res.json());
};
