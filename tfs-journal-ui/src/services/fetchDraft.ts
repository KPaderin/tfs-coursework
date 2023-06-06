import { basicRequest } from './basicRequest';

export const fetchDraft = async (draftId) => {
  const req = JSON.stringify({
    query: `query {
              getDraft(draftId: "${draftId}"){
                _id
                postTitle
                genre
                image
                value
                author {
                  _id
                }
              }
            }`,
  });
  return await basicRequest(req).then((res) => res.data.getDraft);
};
