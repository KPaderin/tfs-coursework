import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import ImageInput from '../ImageInput/ImageInput';
import { type RootState } from '../../redux/store';
import { updateUserImage, updateUserImageAction } from '../../redux/me/actions';
import UserNameInput from '../UserNameInput/UserNameInput';

import styles from './UserBlock.module.css';

interface Props {
  className?: string;
  isEdit?: boolean;
}

function UserBlock({ className, isEdit }: Props) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.currentUser);
  const me = useSelector((state: RootState) => state.me);

  const currentProfileImage = isEdit ? me?.image : currentUser?.image;

  const updateImage = async (imageString) => {
    dispatch(updateUserImageAction());
    dispatch(updateUserImage(imageString));
  };

  return (
    <div className={cn(styles.row, className)}>
      <ImageInput
        className={styles.imgInput}
        isEdit={isEdit}
        imageSrc={currentProfileImage}
        callbackUpdate={updateImage}
      />
      <UserNameInput isEdit={isEdit} />
    </div>
  );
}

export default UserBlock;
