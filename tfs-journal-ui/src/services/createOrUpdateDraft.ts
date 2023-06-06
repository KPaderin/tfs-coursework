import { basicRequest } from './basicRequest';

export const createOrUpdateDraft = async ({
  _id,
  postTitle,
  genre,
  image,
  value,
  isModerateRequested,
}) => {
  const idString = _id ? `_id: "${_id}"` : '';
  const req = JSON.stringify({
    query: `mutation {
      createOrUpdatePostDraft(postDraftInput:{
        ${idString}
        postTitle: "${postTitle}"
        genre:"${genre}"
        image:"${image}"
        value: "${value}"
        ${
  isModerateRequested
    ? `isModerateRequested:${isModerateRequested}`
    : ''
}
      }){
        _id
        postTitle
        genre
        image
        value
      }
    }`,
  });
  return await basicRequest(req).then(
    (res) => res.data.createOrUpdatePostDraft,
  );
};
