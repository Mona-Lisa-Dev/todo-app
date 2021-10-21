import SliderItem from 'components/SliderItem';
import sliders from 'components/SliderList/slider.json';

const slider = sliders[0];

export default {
  component: SliderItem,
  title: 'Components/SliderItem',
};

const Template = args => <SliderItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  slider,
};
