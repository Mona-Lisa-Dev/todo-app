import { useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'i18n';
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
            <h3>{translate(slider.title)}</h3>
            <p className={styles.text}>{translate(slider.text)}</p>
          </div>
        </>
      )}
    </div>
  );
};

SliderItem.propTypes = {
  slider: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
  }).isRequired,
};

export default SliderItem;
