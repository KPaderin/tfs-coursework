import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import LimitedContainer from '../LimitedContainer/LimitedContainer';
import { type RootState } from '../../redux/store';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Footer.module.css';

function Footer() {
  const me = useSelector((state: RootState) => state.me);
  const isAuth = !(me == null);

  const [login, logout] = useAuthentication();

  return (
    <LimitedContainer className={styles.limitedContainer}>
      <div className={styles.mainContainer}>
        <NavLink className={styles.mainLink} to="/feed">
          Главная
        </NavLink>
        <NavLink className={styles.newPostLink} to="/newPost">
          Написать пост
        </NavLink>
        {isAuth ? (
          <button
            className={styles.logout}
            onClick={() => {
              logout();
            }}
          >
            Выйти
          </button>
        ) : (
          <button
            className={styles.logout}
            onClick={() => {
              login();
            }}
          >
            Войти
          </button>
        )}
      </div>
    </LimitedContainer>
  );
}

export default Footer;
