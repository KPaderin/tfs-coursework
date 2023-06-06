import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../components/Post/Post';
import LimitedContainer from '../components/LimitedContainer/LimitedContainer';
import Comment from '../components/Comment/Comment';
import { type RootState } from '../redux/store';
import CommentForm from '../components/CommentForm/CommentForm';
import { loadPost, loadCurrentPostAction } from '../redux/currentPost/actions';
import PreLoader from '../components/PreLoader/PreLoader';

function PostPage() {
  const dispatch = useDispatch();

  const { postId } = useParams<string>();

  const comments = useSelector(
    (state: RootState) => state.currentPost?.comments,
  );
  const isLoading = useSelector(
    (state: RootState) => state.currentPost?.loading,
  );

  const isNotAuth = useSelector((state: RootState) => state?.me) == null;

  useEffect(() => {
    dispatch(loadCurrentPostAction());
    dispatch(loadPost(postId));
  }, [dispatch, postId]);

  return (
    <LimitedContainer>
      <PreLoader loading={isLoading} />
      {!isLoading && (
        <>
          <Post disabled={isNotAuth} />
          <CommentForm postId={postId} disabled={isNotAuth} />
          {comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </LimitedContainer>
  );
}

export default PostPage;
