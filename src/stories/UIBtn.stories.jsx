import UIBtn from 'components/UI/UIBtn';

export default {
  title: 'UI/UIBtn',
  component: UIBtn,

  argTypes: {
    onClick: { action: 'clicked' },
    classNameForm: {
      options: ['contained', 'outlined'],
      control: { type: 'radio' },
    },
    type: {
      options: ['submit', 'button', 'reset'],
      control: { type: 'select' },
    },
  },
};

const Template = args => <UIBtn {...args} />;

export const Contained = Template.bind({});
Contained.args = {
  text: 'search',
  classNameForm: 'contained',
};

export const Outlined = Template.bind({});
Outlined.args = {
  text: 'search',
  classNameForm: 'outlined',
};
