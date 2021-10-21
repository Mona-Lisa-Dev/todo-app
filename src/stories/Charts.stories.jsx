import Charts from 'components/Charts';

export default {
  component: Charts,
  title: 'Components/Charts',
  argTypes: {
    complete: { control: { type: 'range', min: 0, step: 1 } },
    notComplete: { control: { type: 'range', min: 0, step: 1 } },
  },
};

const Template = args => <Charts {...args} />;

export const Default = Template.bind({});
Default.args = {
  complete: 10,
  notComplete: 20,
};
