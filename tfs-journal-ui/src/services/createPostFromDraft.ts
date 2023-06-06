import { basicRequest } from './basicRequest';

export const createPostFromDraft = async ({
  _id,
  postTitle,
  genre,
  image,
  value,
}) => {
  const req = JSON.stringify({
    query: `mutation {
              createPostFromDraft(postFromDraftInput:{
                draftId:"${_id}"
                postTitle: "${postTitle}"
                genre:"${genre}"
                image:"${image}"
                value: "${value}"
              }){
                _id
                postTitle
                date
                genre
                image
                value
              }
            }`,
  });
  return await basicRequest(req).then((res) => res.data.createPostFromDraft);
};
