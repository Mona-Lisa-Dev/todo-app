import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { Button, IconButton } from '@material-ui/core';
import { Edit, ExitToApp } from '@material-ui/icons';

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
            <label>Zoom:</label>
            <input
              name="scale"
              type="range"
              onChange={handleScale}
              min={'1'}
              max="3"
              step="0.01"
              value={scale}
            />

            <Button variant="contained" onClick={handleToggleModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={uploadHandler}>
              Save
            </Button>
          </div>
        </Modal>
      )}

      <div className={styles.emailWrapper}>
        <span>E-mail:</span>
        <span className={styles.emailText}>{userEmail}</span>
      </div>
      <div className={styles.nameWrapper}>
        <span>Name:</span>
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

            <IconButton
              aria-label="Update name"
              type="button"
              onClick={toggleUpdateName}
              title="Update name"
            >
              <Edit />
            </IconButton>
          </>
        )}
      </div>

      <div className={styles.imageWrapper}>
        <img src={preview} alt="User avatar" />
      </div>

      <div>
        <Button variant="contained" component="label">
          Update Avatar
          <input
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            hidden
          />
        </Button>
      </div>

      <Button
        className={styles.exitBtn}
        type="button"
        variant="contained"
        color="primary"
        endIcon={<ExitToApp>exit</ExitToApp>}
        onClick={logoutHandler}
      >
        {translate('logout')}
      </Button>
    </>
  );
};

export default FileUploaderForm;
