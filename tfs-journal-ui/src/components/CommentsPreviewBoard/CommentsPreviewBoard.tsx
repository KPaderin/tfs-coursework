import BoardPostPreview from '../BoardPostPreview/BoardPostPreview';

import styles from './CommentsPreviewBoard.module.css';

interface Props {
  comments?: [
    {
      _id: string;
      value: string;
      post: {
        postTitle: string;
        _id: string;
      };
    }
  ];
}

function CommentsPreviewBoard({ comments }: Props) {
  return (
    <div className={styles.container}>
      {comments?.map((item) => (
        <BoardPostPreview key={item._id} post={item.post}>
          <blockquote className={styles.commentValue}>{item.value}</blockquote>
        </BoardPostPreview>
      ))}
    </div>
  );
}

export default CommentsPreviewBoard;
