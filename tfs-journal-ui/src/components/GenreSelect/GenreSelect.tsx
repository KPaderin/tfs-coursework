import { useSelector } from 'react-redux';

import { type RootState } from '../../redux/store';

import styles from './GenreSelect.module.css';

interface Props {
  disabled?: boolean;
  genre: string | undefined;
  setGenre: any;
}

function GenreSelect({ disabled, genre, setGenre }: Props) {
  const genres = useSelector((state: RootState) => state.genres) || [];

  const genreHandler = (e) => {
    setGenre(e.target.value);
  };

  return (
    <select
      className={styles.genreSelect}
      disabled={disabled}
      value={genre}
      onChange={genreHandler}
    >
      <option value="">-Выберите жанр-</option>
      {genres.map((genre) => (
        <option key={genre._id} value={genre.genre}>
          {genre.genre}
        </option>
      ))}
    </select>
  );
}

export default GenreSelect;
