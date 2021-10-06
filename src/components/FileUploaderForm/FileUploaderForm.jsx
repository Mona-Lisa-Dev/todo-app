import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';

import Modal from 'components/Modal';
import { getUserAvatar } from 'redux/auth/auth-selectors';
import { updateAvatar } from 'redux/auth/auth-operations';

import styles from './FileUploaderForm.module.scss';

const FileUploaderForm = () => {
  const avatarImage = useSelector(getUserAvatar);
  const [avatar, setAvatar] = useState(avatarImage);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [preview, setPreview] = useState(avatarImage);
  const [showModal, setShowModal] = useState(false);

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

  const handlePositionChange = newPosition => {
    setPosition(newPosition);
  };

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
              // border={50}
              borderRadius={4}
              color={[255, 255, 255, 0.6]} // RGBA
              // scale={1.2}
              rotate={0}
              style={{ borderRadius: '4px' }}
              position={position}
              onPositionChange={handlePositionChange}
            />

            <button onClick={uploadHandler}>Upload</button>
          </div>
        </Modal>
      )}

      <div>
        <input name="avatar" type="file" onChange={handleFileInput} />
      </div>

      <div className={styles.imageWrapper}>
        <img src={preview} alt="User avatar" />
      </div>
    </>
  );
};

export default FileUploaderForm;
