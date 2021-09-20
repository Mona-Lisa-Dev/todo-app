import SliderList from 'components/SliderList';
import { translate } from 'i18n';

const SliderPage = () => (
  <>
    <h2>{translate('slider_title')}</h2>
    <SliderList />
  </>
);

export default SliderPage;
