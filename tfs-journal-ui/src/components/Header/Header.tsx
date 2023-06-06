import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import logo from '../../assets/logo.svg';
import accountLogo from '../../assets/account.svg';
import { type RootState } from '../../redux/store';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Header.module.css';

interface Props {
  className?: string;
}

function Header({ className }: Props) {
  const navigate = useNavigate();

  const me = useSelector((state: RootState) => state.me);

  const [login] = useAuthentication();

  const profileHandler = () => {
    if (me?._id) {
      navigate(`/${me?._id}`);
      return;
    }
    login();
  };

  return (
    <header className={cn(styles.container, className)}>
      <NavLink to="/feed">
        <img className={styles.logo} alt="logo" src={logo} />
      </NavLink>
      <div className={styles.accountButton}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-noninteractive-element-interactions */}
        <img
          className={styles.accountImage}
          onClick={profileHandler}
          alt="account"
          src={me?.image || accountLogo}
        />
      </div>
    </header>
  );
}

export default Header;
