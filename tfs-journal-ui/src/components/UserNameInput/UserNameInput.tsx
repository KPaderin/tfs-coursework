import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { type RootState } from '../../redux/store';
import { updateUserNameAction, updateUserName } from '../../redux/me/actions';

import styles from './UserNameInput.module.css';

interface Props {
  isEdit?: boolean;
}

function UserNameInput({ isEdit }: Props) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.currentUser);
  const me = useSelector((state: RootState) => state.me);

  const currentProfileName = isEdit ? me?.name : currentUser?.name;

  const [userName, setUserName] = useState(currentProfileName);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!me?.userNameLoading) {
      setEditing(false);
    }
  }, [me?.userNameLoading]);

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const closeHandler = () => {
    setEditing(false);
  };

  const editHandler = () => {
    setUserName(currentProfileName);
    setEditing(true);
  };

  const submitHandler = () => {
    dispatch(updateUserNameAction());
    dispatch(updateUserName(userName));
  };

  return (
    <div className={styles.row} data-edit={isEdit ? editing : null}>
      {!editing ? (
        <h3>{currentProfileName}</h3>
      ) : (
        <label>
          <input
            disabled={me?.userNameLoading}
            className={styles.titleInput}
            value={userName}
            onChange={userNameHandler}
            placeholder="Заголовок статьи"
          />
        </label>
      )}
      <button className={styles.editButton} onClick={editHandler} />
      <button className={styles.submitButton} onClick={submitHandler} />
      <button className={styles.closeButton} onClick={closeHandler} />
    </div>
  );
}

export default UserNameInput;
