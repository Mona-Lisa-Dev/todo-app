import Slider from 'react-slick';

import SliderItem from 'components/SliderItem';
import { translate } from 'i18n';
import sliders from './slider.json';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SliderList.module.scss';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  const classes = `${className} ${styles.arrow}`;

  return <div className={classes} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  const classes = `${className} ${styles.arrow}`;
  return <div className={classes} onClick={onClick} />;
}

const SliderList = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.sliderListWrapper}>
      <h2 className={styles.sliderTitle}>{translate('slider_title')}</h2>
      <Slider {...settings}>
        {sliders.map(slider => (
          <div key={slider.id}>
            <SliderItem slider={slider}></SliderItem>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderList;
