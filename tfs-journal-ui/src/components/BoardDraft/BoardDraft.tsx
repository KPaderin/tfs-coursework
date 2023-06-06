import { NavLink } from 'react-router-dom';

import BoardItem from '../BoardItem/BoardItem';
import GenreItem from '../GenreItem/GenreItem';
import { type Draft } from '../../types/types';

import styles from './BoardDraft.module.css';

interface Props {
  draft: Draft;
}

function BoardDraft({ draft }: Props) {
  const isGenreVisible = draft.genre && draft.genre !== 'undefined';
  const isImageVisible = draft?.image && draft.image !== 'undefined';
  return (
    <BoardItem className={styles.container}>
      {isGenreVisible && (
        <div className={styles.info}>
          <GenreItem className={styles.genreLink} genre={draft.genre} />
        </div>
      )}
      <NavLink className={styles.postLink} to={`/drafts/${draft._id}`}>
        <h3 className={styles.title}>{draft.postTitle}</h3>
      </NavLink>
      {isImageVisible && (
        <img
          className={styles.postImage}
          src={draft.image}
          alt="фоточка черновика"
        />
      )}
    </BoardItem>
  );
}

export default BoardDraft;
