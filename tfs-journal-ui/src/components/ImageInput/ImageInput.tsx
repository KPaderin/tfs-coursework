import { useState } from 'react';
import cn from 'classnames';

import defaultUserImage from '../../assets/defaultAvatar.png';
import { uploadImage } from '../../services/uploadImage';
import { imageStaticURL } from '../../configs/config';

import styles from './ImageInput.module.css';

interface Props {
  className?: string;
  isEdit?: boolean;
  imageSrc?: string;
  callbackUpdate?: (string) => void;
  defaultImage?: string;
}

function ImageInput({
  className,
  isEdit,
  imageSrc,
  callbackUpdate,
  defaultImage,
}: Props) {
  const [status, setStatus] = useState<boolean>(false);

  const inputHandler = (e) => {
    if (callbackUpdate == null) return;
    const image = e.target.files[0];
    setStatus(true);
    uploadImage(image)
      .then(({ filename }) => {
        setStatus(false);
        callbackUpdate(`${imageStaticURL}/${filename}`);
      })
      .catch((e) => {
        alert('ошибка ');
        setStatus(false);
        callbackUpdate(imageSrc);
      });
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    if (callbackUpdate == null) return;
    callbackUpdate('');
  };
  return (
    <div
      className={cn(styles.container, className)}
      data-loading={status}
      data-edit={isEdit}
    >
      <img
        className={styles.icon}
        alt="аватарка"
        src={imageSrc || defaultImage || defaultUserImage}
      />
      <label className={styles.input}>
        <input onInput={inputHandler} type="file" accept="image/*" />
      </label>
      <button className={styles.deleteButton} onClick={deleteHandler} />
    </div>
  );
}

export default ImageInput;
