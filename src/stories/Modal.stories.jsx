import React from 'react';
import Modal from 'components/Modal';

export default {
  component: Modal,
  title: 'Components/Modal',
  argTypes: {
    children: { control: 'text' },
    onClose: { action: 'closed' },
  },
};

const Template = args => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  children:
    'Some text for modal window, here must be your components as children',
};
