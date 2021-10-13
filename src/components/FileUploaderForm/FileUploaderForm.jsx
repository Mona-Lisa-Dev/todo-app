import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';

import { Edit } from 'icons/Edit';
import { ExitToAppIcon } from 'icons/ExitToAppIcon';
import UIIconBtn from 'components/UI/UIIconBtn';
import UIBtn from 'components/UI/UIBtn';

import { logout } from 'redux/auth/auth-operations';
import { translate } from 'i18n';

import Modal from 'components/Modal';
import {
  getUserAvatar,
  getUserName,
  getUserEmail,
} from 'redux/auth/auth-selectors';
import { updateAvatar, updateUser } from 'redux/auth/auth-operations';

import styles from './FileUploaderForm.module.scss';

const FileUploaderForm = () => {
  const avatarImage = useSelector(getUserAvatar);
  const userName = useSelector(getUserName);
  const userEmail = useSelector(getUserEmail);
  const [avatar, setAvatar] = useState(avatarImage);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [preview, setPreview] = useState(avatarImage);
  const [scale, setScale] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [updateName, setUpdateName] = useState(false);
  const [newName, setNewName] = useState(userName || 'Guest');
  // const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const handleToggleModal = () => setShowModal(!showModal);

  const cropper = useRef(null);

  const handleFileInput = e => {
    handleToggleModal();
    setAvatar(e.target.files[0]);
  };

  const uploadHandler = async () => {
    const crop = cropper.current;

    const croppedImg = crop.getImageScaledToCanvas().toDataURL();
    let res = await makeRequest(croppedImg);

    const fd = new FormData();
    fd.append('avatar', res, avatar.name);

    dispatch(updateAvatar(fd));
    setPreview(croppedImg);

    handleToggleModal();
  };

  const makeRequest = async url => {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'blob';
      request.onload = () => {
        resolve(request.response);
      };
      request.send();
    });
  };

  const handleScale = e => setScale(parseFloat(e.target.value));
  const handlePositionChange = newPosition => setPosition(newPosition);
  const toggleUpdateName = e => setUpdateName(!updateName);
  const handleChangeName = e => setNewName(e.target.value);
  const handleBlur = () => {
    toggleUpdateName();
    if (newName === userName) return;
    if (newName === '') {
      setNewName(userName);
      // setErrorMessage('Name is required');
      return;
    }

    dispatch(updateUser({ name: newName }));
  };
  const logoutHandler = () => dispatch(logout());

  return (
    <>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <div className={styles.modalDataWrapper}>
            <AvatarEditor
              ref={cropper}
              image={avatar}
              width={250}
              height={250}
              borderRadius={4}
              color={[255, 255, 255, 0.6]}
              scale={scale}
              rotate={0}
              style={{ borderRadius: '4px' }}
              position={position}
              onPositionChange={handlePositionChange}
            />
            <label>{translate('zoom')}:</label>
            <input
              name="scale"
              type="range"
              onChange={handleScale}
              min={'1'}
              max="3"
              step="0.01"
              value={scale}
            />

            <UIBtn
              classNameForm="contained"
              text="cancel"
              onClick={handleToggleModal}
            />
            <UIBtn
              classNameForm="contained"
              text="save"
              onClick={uploadHandler}
            />
          </div>
        </Modal>
      )}

      <div className={styles.emailWrapper}>
        <span>E-mail:</span>
        <span className={styles.emailText}>{userEmail}</span>
      </div>
      <div className={styles.nameWrapper}>
        <span>{translate('name')}:</span>
        {updateName ? (
          <input
            autoFocus
            className={styles.updateName}
            type="text"
            value={newName}
            onChange={handleChangeName}
            onBlur={handleBlur}
            required
          />
        ) : (
          <>
            <p className={styles.name} onClick={toggleUpdateName}>
              {userName
                ? userName.charAt(0).toUpperCase() + userName.slice(1)
                : 'Guest'}
            </p>
            {/* {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>} */}

            <UIIconBtn
              icon={Edit}
              label="Update name"
              title="update_name"
              type="button"
              onClick={toggleUpdateName}
              classNameForm="round"
            />
          </>
        )}
      </div>

      <div className={styles.imageWrapper}>
        <img src={preview} alt="User avatar" />
      </div>

      <div className={styles.updateAvatarBtn}>
        <label>
          {translate('update_avatar')}
          <input
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            hidden
          />
        </label>
      </div>

      <UIBtn
        classNameForm="contained"
        text="logout"
        type="button"
        onClick={logoutHandler}
        icon={ExitToAppIcon}
      />
    </>
  );
};

export default FileUploaderForm;
