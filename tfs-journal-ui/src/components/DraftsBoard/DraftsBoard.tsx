import BoardDraft from '../BoardDraft/BoardDraft';
import { type Draft } from '../../types/types';

import styles from './DraftsBoard.module.css';

interface Props {
  drafts?: Draft[];
}

function DraftsBoard({ drafts }: Props) {
  return (
    <div className={styles.container}>
      {drafts?.map((item) => (
        <BoardDraft key={item._id} draft={item} />
      ))}
    </div>
  );
}

export default DraftsBoard;
