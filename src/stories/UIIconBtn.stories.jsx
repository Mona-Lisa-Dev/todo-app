import UIIconBtn from 'components/UI/UIIconBtn';

export default {
  title: 'UI/UIIconBtn',
  component: UIIconBtn,

  argTypes: {
    onClick: { action: 'clicked' },
    classNameForm: {
      options: ['square', 'round', 'outlined'],
      control: { type: 'radio' },
    },
    type: {
      options: ['submit', 'button', 'reset'],
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
    icon: { control: '' },
    label: { control: 'text' },
    title: { control: 'text' },
  },
};

const Template = args => <UIIconBtn {...args} />;

export const Square = Template.bind({});
Square.args = {
  classNameForm: 'square',
};

export const Round = Template.bind({});
Round.args = {
  classNameForm: 'round',
};

export const Outlined = Template.bind({});
Outlined.args = {
  classNameForm: 'outlined',
};
