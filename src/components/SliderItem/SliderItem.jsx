import { useState } from 'react';
import styles from './SliderItem.module.scss';

const SliderItem = ({ slider }) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  const image = require(`../../${slider.image}`).default;
  const video = require('../../video/cat.mp4').default;
  return (
    <div
      className={styles.sliderItem}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseOut={() => setMouseEnter(false)}
    >
      {mouseEnter ? (
        <div className={styles.imageWrapper}>
          <video className={styles.image} autoPlay src={video} controls></video>
        </div>
      ) : (
        <>
          <div className={styles.imageWrapper}>
            <img
              src={image}
              loading="lazy"
              alt="cat"
              className={styles.image}
            />
          </div>
          <div className={styles.infoWrapper}>
            <h3>{slider.title}</h3>
            <p className={styles.text}>{slider.text}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SliderItem;
