import BoardPostPreview from '../BoardPostPreview/BoardPostPreview';

import styles from './PostsPreviewBoard.module.css';

interface Props {
  posts?: [
    {
      _id: string;
      postTitle: string;
    }
  ];
}

function PostsPreviewBoard({ posts }: Props) {
  return (
    <div className={styles.container}>
      {posts?.map((item) => (
        <BoardPostPreview key={item._id} post={item} />
      ))}
    </div>
  );
}

export default PostsPreviewBoard;
